const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Instala as dependências necessárias
try {
  execSync('npm install -g imagemin-cli');
} catch (error) {
  console.log('imagemin já está instalado');
}

const buildDir = path.join(__dirname, '../build');

// Otimiza imagens
const optimizeImages = () => {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];
  
  const findImages = (dir) => {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findImages(filePath);
      } else if (imageExtensions.includes(path.extname(file).toLowerCase())) {
        try {
          execSync(`imagemin "${filePath}" --out-dir="${path.dirname(filePath)}"`);
          console.log(`✓ Imagem otimizada: ${file}`);
        } catch (error) {
          console.error(`× Erro ao otimizar ${file}:`, error);
        }
      }
    });
  };

  console.log('🖼 Otimizando imagens...');
  findImages(buildDir);
};

// Remove source maps
const removeSourceMaps = () => {
  console.log('🗑 Removendo source maps...');
  const files = fs.readdirSync(path.join(buildDir, 'static/js'));
  files.forEach(file => {
    if (file.endsWith('.map')) {
      fs.unlinkSync(path.join(buildDir, 'static/js', file));
      console.log(`✓ Source map removido: ${file}`);
    }
  });
};

// Executa as otimizações
console.log('🚀 Iniciando otimizações...');
optimizeImages();
removeSourceMaps();
console.log('✨ Otimizações concluídas!'); 