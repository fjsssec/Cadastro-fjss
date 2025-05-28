document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Pegar valores do formulário
    const formData = new FormData(this);
    const entries = formData.entries();
    const data = Object.fromEntries(entries);
    
    // Adicionar à tabela
    const tbody = document.querySelector('#tabelaCadastros tbody');
    const newRow = tbody.insertRow();
    
    Object.values(data).forEach(value => {
        newRow.insertCell().textContent = value;
    });
    
    // Limpar formulário
    this.reset();
});