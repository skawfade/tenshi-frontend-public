import DOMPurify from 'isomorphic-dompurify'

export default function sanitizeHTML({
  descriptionHtml,
  color
}: {
  descriptionHtml: string
  color: `#${string}` | undefined
}) {
  DOMPurify.addHook('afterSanitizeElements', function (node) {
    if (!node.tagName) {
      return
    }

    if (node.tagName.toLowerCase() === 'br') {
      const spaceNode = document.createTextNode(' '); // Создаем узел пробела
      node.parentNode?.insertBefore(spaceNode, node); // Вставляем пробел перед узлом <br>
      node.parentNode?.removeChild(node); // Удаляем узел <br>
      return
    }

    if (node.tagName.toLowerCase() === 'a') {
      node.setAttribute('style', `color: ${color}`)
      node.setAttribute('class', 'link')
    }
  })

  return DOMPurify.sanitize(descriptionHtml)
}
