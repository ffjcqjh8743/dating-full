import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function UploadPhoto() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');

  const upload = async () => {
    if (!file) return;

    const { data, error } = await supabase.storage
      .from('photos')
      .upload(`public/${file.name}`, file);

    if (error) {
      alert('Ошибка загрузки: ' + error.message);
    } else {
      const { publicURL } = supabase.storage.from('photos').getPublicUrl(`public/${file.name}`);
      setUrl(publicURL || '');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">📷 Загрузить фото</h1>
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="mb-4" />
      <button onClick={upload} className="px-4 py-2 bg-blue-600 text-white rounded">Загрузить</button>
      {url && <div className="mt-4"><img src={url} className="w-48" alt="uploaded" /></div>}
    </div>
  );
}
