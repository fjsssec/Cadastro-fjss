let registros = [];
let editandoIndex = -1;

document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const registro = {
        name: document.getElementById('name').value,
        sobrenome: document.getElementById('sobrenome').value,
        idade: document.getElementById('idade').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value
    };

    if (editandoIndex === -1) {
        // Adicionar novo registro
        registros.push(registro);
    } else {
        // Atualizar registro existente
        registros[editandoIndex] = registro;
        editandoIndex = -1;
        document.getElementById('submitBtn').textContent = 'Cadastrar';
        document.getElementById('cancelEditBtn').style.display = 'none';
    }

    atualizarTabela();
    this.reset();
});

document.getElementById('cancelEditBtn').addEventListener('click', function() {
    editandoIndex = -1;
    document.getElementById('cadastroForm').reset();
    document.getElementById('submitBtn').textContent = 'Cadastrar';
    this.style.display = 'none';
});

function atualizarTabela() {
    const tbody = document.querySelector('#tabelaCadastros tbody');
    tbody.innerHTML = '';

    registros.forEach((registro, index) => {
        const row = tbody.insertRow();
        
        row.insertCell().textContent = registro.name;
        row.insertCell().textContent = registro.sobrenome;
        row.insertCell().textContent = registro.idade;
        row.insertCell().textContent = registro.cpf;
        row.insertCell().textContent = registro.telefone;
        row.insertCell().textContent = registro.email;
        
        const actionsCell = row.insertCell();
        actionsCell.className = 'action-buttons';
        
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.className = 'action-btn edit-btn';
        editBtn.title = 'Editar';
        editBtn.onclick = () => editarRegistro(index);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.className = 'action-btn delete-btn';
        deleteBtn.title = 'Excluir';
        deleteBtn.onclick = () => excluirRegistro(index);
        
        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(deleteBtn);
    });
}

function editarRegistro(index) {
    const registro = registros[index];
    editandoIndex = index;
    
    document.getElementById('name').value = registro.name;
    document.getElementById('sobrenome').value = registro.sobrenome;
    document.getElementById('idade').value = registro.idade;
    document.getElementById('cpf').value = registro.cpf;
    document.getElementById('telefone').value = registro.telefone;
    document.getElementById('email').value = registro.email;
    
    document.getElementById('submitBtn').textContent = 'Salvar Alterações';
    document.getElementById('cancelEditBtn').style.display = 'inline-block';
    document.getElementById('name').focus();
}

function excluirRegistro(index) {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
        registros.splice(index, 1);
        atualizarTabela();
        
        if (editandoIndex === index) {
            editandoIndex = -1;
            document.getElementById('cadastroForm').reset();
            document.getElementById('submitBtn').textContent = 'Cadastrar';
            document.getElementById('cancelEditBtn').style.display = 'none';
        }
    }
}
