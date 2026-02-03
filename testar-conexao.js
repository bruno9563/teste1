// Script para testar se o backend está funcionando corretamente
import axios from 'axios';

const BACKEND_URL = 'https://teste1-1-dor4.onrender.com';

console.log('🔍 Testando conexão com o backend...\n');

async function testarBackend() {
    try {
        console.log(`📡 Testando: ${BACKEND_URL}/usuarios`);
        const response = await axios.get(`${BACKEND_URL}/usuarios`);

        console.log('✅ BACKEND ESTÁ ONLINE!');
        console.log(`📊 Usuários cadastrados: ${response.data.length}`);
        console.log('\n👥 Lista de usuários:');
        response.data.forEach((user, index) => {
            console.log(`   ${index + 1}. ${user.name} (${user.email})`);
        });

        return true;
    } catch (error) {
        console.log('❌ ERRO AO CONECTAR COM O BACKEND!');
        console.log(`   Mensagem: ${error.message}`);

        if (error.code === 'ECONNREFUSED') {
            console.log('\n💡 Solução: O backend está offline. Acesse o Render e faça "Manual Deploy"');
        } else if (error.response?.status === 404) {
            console.log('\n💡 Solução: A rota /usuarios não foi encontrada. Verifique o server.js');
        } else {
            console.log('\n💡 Solução: Verifique os logs no Render para mais detalhes');
        }

        return false;
    }
}

async function testarGifts() {
    try {
        console.log('\n📡 Testando rota de presentes...');
        const response = await axios.get(`${BACKEND_URL}/users/teste/gifts`);
        console.log('✅ Rota de presentes está funcionando!');
        return true;
    } catch (error) {
        if (error.response?.status === 404) {
            console.log('⚠️  Nenhum presente encontrado (normal se não houver presentes)');
        } else {
            console.log('❌ Erro ao testar presentes:', error.message);
        }
        return false;
    }
}

// Executar testes
(async () => {
    const backendOk = await testarBackend();

    if (backendOk) {
        await testarGifts();
        console.log('\n✅ TUDO FUNCIONANDO! Seu site está pronto para usar.');
    } else {
        console.log('\n❌ BACKEND OFFLINE! Siga as instruções acima para reconectar.');
    }

    console.log('\n📚 Para mais detalhes, consulte: GUIA_RECONEXAO_COMPLETO.md');
})();
