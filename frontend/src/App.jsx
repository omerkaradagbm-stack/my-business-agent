import React, { useEffect, useState } from 'react';
};


return (
<div style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial' }}>
<h1>Müşteri Kayıt</h1>
<form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
<div>
<label>Ad Soyad*</label><br />
<input name="name" value={form.name} onChange={onChange} required minLength={2} style={{ width: '100%', padding: 8 }} />
</div>
<div>
<label>E‑posta*</label><br />
<input type="email" name="email" value={form.email} onChange={onChange} required style={{ width: '100%', padding: 8 }} />
</div>
<div>
<label>Telefon</label><br />
<input name="phone" value={form.phone} onChange={onChange} style={{ width: '100%', padding: 8 }} />
</div>
<div>
<label>Şirket</label><br />
<input name="company" value={form.company} onChange={onChange} style={{ width: '100%', padding: 8 }} />
</div>
<button type="submit" disabled={loading} style={{ padding: '10px 14px', cursor: 'pointer' }}>
{loading ? 'Kaydediliyor…' : 'Kaydet'}
</button>
</form>


{success && <p style={{ color: 'green' }}>{success}</p>}
{errors.length > 0 && (
<ul style={{ color: 'crimson' }}>
{errors.map((e, i) => (<li key={i}>{e}</li>))}
</ul>
)}


<hr style={{ margin: '2rem 0' }} />


<h2>Son 100 Müşteri</h2>
<table width="100%" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
<thead>
<tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
<th>ID</th>
<th>Ad</th>
<th>E‑posta</th>
<th>Telefon</th>
<th>Şirket</th>
<th>Oluşturma</th>
</tr>
</thead>
<tbody>
{list.map((c) => (
<tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
<td>{c.id}</td>
<td>{c.name}</td>
<td>{c.email}</td>
<td>{c.phone || '-'}</td>
<td>{c.company || '-'}</td>
<td>{new Date(c.created_at).toLocaleString()}</td>
</tr>
))}
{list.length === 0 && (
<tr>
<td colSpan="6">Henüz kayıt yok.</td>
</tr>
)}
</tbody>
</table>
</div>
);
}
