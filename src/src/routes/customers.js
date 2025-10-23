import { Router } from 'express';
import { pool } from '../db.js';


const router = Router();


function validateCustomer({ name, email, phone, company }) {
const errors = [];
if (!name || name.trim().length < 2) errors.push('Ad en az 2 karakter olmalı.');
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Geçerli bir e‑posta girin.');
if (phone && phone.length > 40) errors.push('Telefon çok uzun.');
if (company && company.length > 180) errors.push('Şirket adı çok uzun.');
return errors;
}


router.post('/', async (req, res) => {
try {
const { name, email, phone, company } = req.body;
const errors = validateCustomer({ name, email, phone, company });
if (errors.length) return res.status(400).json({ errors });


const sql = 'INSERT INTO customers (name, email, phone, company) VALUES ($1, $2, $3, $4) RETURNING id';
const params = [name.trim(), email.trim().toLowerCase(), phone || null, company || null];
const { rows } = await pool.query(sql, params);


return res.status(201).json({ id: rows[0].id, name, email, phone, company });
} catch (err) {
if (err && err.code === '23505') { // unique_violation
return res.status(409).json({ errors: ['Bu e‑posta ile kayıt zaten var.'] });
}
console.error('POST /customers error:', err);
return res.status(500).json({ errors: ['Sunucu hatası.'] });
}
});


router.get('/', async (_req, res) => {
try {
const { rows } = await pool.query('SELECT id, name, email, phone, company, created_at FROM customers ORDER BY id DESC LIMIT 100');
res.json(rows);
} catch (err) {
console.error('GET /customers error:', err);
res.status(500).json({ errors: ['Sunucu hatası.'] });
}
});


export default router;
