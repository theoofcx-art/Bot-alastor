import JSZip from 'jszip';
import { BotConfig } from '../types/bot';
import {
  generateIndexJs,
  generateAlastorJs,
  generateSettingsJson,
  generatePackageJson,
  generateTermuxScript,
  generateTutorialMd,
} from '../data/botTemplates';

export async function exportBotZip(config: BotConfig): Promise<void> {
  const zip = new JSZip();

  zip.file('index.js', generateIndexJs(config));
  zip.file('alastor.js', generateAlastorJs(config));
  zip.file('settings.json', generateSettingsJson(config));
  zip.file('package.json', generatePackageJson(config));
  zip.file('termux.sh', generateTermuxScript(config));
  zip.file('TUTORIAL.md', generateTutorialMd(config));

  // Local databases for rent, economy, and moderation
  zip.file('database/aluguel.json', JSON.stringify({}, null, 2));
  zip.file('database/carteira.json', JSON.stringify({}, null, 2));
  zip.file('database/warns.json', JSON.stringify({}, null, 2));

  // Generate zip blob
  const content = await zip.generateAsync({ type: 'blob' });
  const filename = `${config.botName.toLowerCase().replace(/\s+/g, '-')}-termux-bot.zip`;

  // Trigger browser download
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
