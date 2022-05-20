import html2Canvas from 'html2canvas'

import JsPDF from 'jspdf'

export default {
  install(Vue, options) {
    Vue.prototype.getpdf = function() {
      var title = this.htmlTitle
      let that = this
      html2Canvas(document.querySelector('#printWrapperAndPdfContent'), {

        useCORS: true,//允许图片跨域截取

        allowTaint: true


      }).then(function(canvas) {

        document.body.appendChild(canvas)

        let contentWidth = canvas.width

        let contentHeight = canvas.height

        let pageHeight = contentWidth / 592.28 * 841.89

        let leftHeight = contentHeight

        let position = 0

        let imgWidth = 535.28

        let imgHeight = 532.28 / contentWidth * contentHeight

        let pageData = canvas.toDataURL('image/jpeg', 1.0)

        let PDF = new JsPDF('', 'pt', 'a4')

        if (leftHeight < pageHeight) {

          PDF.addImage(pageData, 'JPEG', 30, 30, imgWidth, imgHeight)

        } else {

          while (leftHeight > 0) {

            PDF.addImage(pageData, 'JPEG', 30, position, imgWidth, imgHeight)

            leftHeight -= pageHeight

            position -= 841.89

            if (leftHeight > 0) {

              PDF.addPage()

            }

          }

        }

        PDF.save(title + '.pdf')

      }).catch(err => {

        console.log(err)

      })

    }

  }

}