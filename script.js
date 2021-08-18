window.onload = () => {
  handleButton('button', 'box')

  addApps('apps', [
    { name: 'Reddit', img: 'icons/reddit.svg' },
    { name: 'iFunny', img: 'icons/ifunny.svg' }
  ])
}

function handleButton (button, box) {
  button = document.getElementsByClassName(button)[0]
  box = document.getElementsByClassName(box)[0]

  button.onclick = () => box.classList.toggle('open')
}

function addApps (node, apps) {
  node = document.getElementsByClassName(node)[0]

  for (let app of apps) {
    let div = document.createElement('div')
    div.classList.add('bubble')
    let img = document.createElement('img')
    img.src = app.img
    div.appendChild(img)
    node.appendChild(div)
  }
}
