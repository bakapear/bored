/* global fetch */

window.onload = () => {
  handleButton('button', 'box')

  addApps('apps', [
    { name: 'Reddit', img: 'icons/reddit.svg' },
    { name: 'iFunny', img: 'icons/ifunny.svg' }
  ])

  addRandomItems('main')
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

async function addRandomItems (main) {
  main = document.getElementsByClassName(main)[0]

  let pics = await fetch('https://www.reddit.com/r/pics/.json').then(j => j.json())
  let items = []
  for (let child of pics.data.children) {
    items.push({
      img: child.data.url
    })
  }
  for (let item of items) {
    let div = document.createElement('div')
    div.classList.add('item')
    let img = document.createElement('img')
    img.src = item.img

    img.onload = () => {
      setTimeout(() => img.classList.add('done'), 100)
      div.appendChild(img)
      main.appendChild(div)
      resizeMasonryItem(main, div)
    }
  }
}

function resizeMasonryItem (masonry, item) {
  let rowGap = parseInt(window.getComputedStyle(masonry).getPropertyValue('grid-row-gap'))
  let rowHeight = parseInt(window.getComputedStyle(masonry).getPropertyValue('grid-auto-rows'))

  let content = item.children[0]

  let rowSpan = Math.ceil((content.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap))
  item.style.gridRowEnd = 'span ' + rowSpan
  content.style.height = rowSpan * rowGap + 'px'
}
