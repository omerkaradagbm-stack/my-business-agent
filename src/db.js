import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;


export const pool = new Pool({
host: process.env.PGHOST,
user: process.env.PGUSER,
password: process.env.PGPASSWORD,
database: process.env.PGDATABASE,
port: Number(process.env.PGPORT) || 5432,
ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});


// tabloyu otomatik oluştur (Render dışına bağlanmaya gerek yok)
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(180) NOT NULL UNIQUE,
        phone VARCHAR(40),
        company VARCHAR(180),
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✅ Customers tablosu hazır.');
  } catch (err) {
    console.error('❌ Tablo oluşturulamadı:', err);
  }
})();


// Başlangıçta tabloyu garantiye almak için
export async function ensureSchema() {
await pool.query(`
CREATE TABLE IF NOT EXISTS customers (
id SERIAL PRIMARY KEY,
name VARCHAR(120) NOT NULL,
email VARCHAR(180) NOT NULL UNIQUE,
phone VARCHAR(40),
company VARCHAR(180),
created_at TIMESTAMPTZ DEFAULT NOW()
);
`);
}
