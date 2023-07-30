let arrayTarefas = []

function renderArticle(dadosBanco) {
    const divTarefa = document.createElement('div')
    divTarefa.classList.add('divTarefa')
    divTarefa.id = `divTarefa-${dadosBanco.id}`
  
    const tarefa = document.createElement('span')
    tarefa.classList.add('tarefa')
    tarefa.textContent = dadosBanco.tarefa

    const divBtn = document.createElement('div')
    divBtn.classList.add('divBtn')

    const btnExclu = document.createElement('button')
    btnExclu.innerText = 'Excluir'
    btnExclu.classList.add('btnExclu')
    btnExclu.addEventListener('click', async (ev) => {
      ev.preventDefault()
      divTarefa.remove()
      const respExclu = await fetch(`http://localhost:3000/postagens/${dadosBanco.id}`, {method:'DELETE', body: JSON.stringify(dadosBanco)})
      const exclu = await respExclu.json()
    })

    const btnEdit = document.createElement('button')
    btnEdit.innerText = 'Editar'
    btnEdit.classList.add('btnEdit')
    btnEdit.addEventListener('click', async (ev) => {
      ev.preventDefault();
    
      let divTarefaId = document.getElementById(`divTarefa-${dadosBanco.id}`).value = dadosBanco.id
     document.getElementById('inputTarefa').value = dadosBanco.tarefa
     divTarefa.remove()

      const delEdit = await fetch(`http://localhost:3000/postagens/${divTarefaId}`, {method:'DELETE', body: JSON.stringify(dadosBanco)})
      const derEdit = await delEdit.json()
      async () => {
      const respostaEdit = await fetch(`http://localhost:3000/postagens/${divTarefaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosBanco)
      })
      const salvarEdit = await respostaEdit.json()
      }
    })
    divBtn.append(btnEdit, btnExclu)
    divTarefa.append(tarefa, divBtn)
    document.getElementById('articles').appendChild(divTarefa)
  }
  
  async function fetchArticles() {
    const articles = await fetch("http://localhost:3000/postagens").then(res => res.json())
    articles.forEach(renderArticle)
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    fetchArticles()
  })

  const form = document.getElementById('form')

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault()

    if (document.getElementById('inputTarefa').value === '') {
      alert('Preencha o campo')
    }else {
    const dadosSalvar = {
      tarefa: document.getElementById('inputTarefa').value
      }
    arrayTarefas.push(dadosSalvar.tarefa)
    
    const respostaServer = await fetch('http://localhost:3000/postagens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosSalvar)
    })

    const salvarDados = await respostaServer.json()
  form.reset()
  renderArticle(salvarDados)
    }
})