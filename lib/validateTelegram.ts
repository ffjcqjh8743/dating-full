import crypto from 'crypto';

export function validateTelegramInitData(initData: string, botToken: string): boolean {
  const secret = crypto.createHash('sha256').update(botToken).digest();
  const parsed = new URLSearchParams(initData);
  const hash = parsed.get('hash');
  parsed.delete('hash');

  const dataCheckString = [...parsed.entries()]
    .map(([key, value]) => `${key}=${value}`)
    .sort()
    .join('\n');

  const hmac = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');

  return hmac === hash;
}
