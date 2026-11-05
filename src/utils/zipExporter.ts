import JSZip from 'jszip';
import { BotConfig } from '../types/bot';
import {
  generateIndexJs,
  generateAlastorJs,
  generateSettingsJson,
  generatePackageJson,
  generateIniciarSh,
  generateTermuxScript,
  generateTutorialMd,
} from '../data/botTemplates';

export async function exportBotZip(config: BotConfig): Promise<void> {
  const zip = new JSZip();

  // Cria a pasta raiz 'alastorbot' dentro do ZIP para os arquivos não ficarem soltos
  const folder = zip.folder('alastorbot')!;

  folder.file('index.js', generateIndexJs(config));
  folder.file('alastor.js', generateAlastorJs(config));
  folder.file('settings.json', generateSettingsJson(config));
  folder.file('package.json', generatePackageJson(config));
  folder.file('iniciar.sh', generateIniciarSh(config));
  folder.file('termux.sh', generateTermuxScript(config));
  folder.file('TUTORIAL.md', generateTutorialMd(config));

  // Bancos de dados locais dentro de alastorbot/database/
  folder.file('database/aluguel.json', JSON.stringify({}, null, 2));
  folder.file('database/carteira.json', JSON.stringify({}, null, 2));
  folder.file('database/warns.json', JSON.stringify({}, null, 2));

  // Generate zip blob
  const content = await zip.generateAsync({ type: 'blob' });
  const filename = `alastorbot.zip`;

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
