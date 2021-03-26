const styleContent = `
      body {
        background: #fafafa;
        font-family: sans-serif;
      }
      h1 {
        font-weight: normal;
      }
      .btn {
        display: inline-block;
        cursor: pointer;
        background: #fff;
        box-shadow: 0 0 1px rgba(0, 0, 0, .2);
        padding: .5em .8em;
        transition: box-shadow .05s ease-in-out;
        -webkit-transition: box-shadow .05s ease-in-out;
      }
      .btn:hover {
        box-shadow: 0 0 2px rgba(0, 0, 0, .2);
      }
      .btn:active, .active, .active:hover {
        box-shadow: 0 0 1px rgba(0, 0, 0, .2),
                    inset 0 0 4px rgba(0, 0, 0, .1);
      }
      .add {
        float: right;
      }
      #app {
        max-width: 42em;
        margin: 0 auto 2em auto;
      }
      .row {
        overflow: hidden;
        box-sizing: border-box;
        width: 100%;
        left: 0px;
        margin: .5em 0;
        padding: 1em;
        background: #fff;
        box-shadow: 0 0 1px rgba(0, 0, 0, .2);
        transition: transform .5s ease-in-out, opacity .5s ease-out, left .5s ease-in-out;
        -webkit-transition: transform .5s ease-in-out, opacity .5s ease-out, left .5s ease-in-out;
      }
      .row div {
        display: inline-block;
        vertical-align: middle;
      }
      .row > div:nth-child(1) {
        width: 35%;
      }
      .row > div:nth-child(2) {
        width: 60%;
      }
      .row > div:nth-child(3) {
        width: 5%;
      }
      .rm-btn {
        cursor: pointer;
        top: 0;
        right: 0;
        color: #C25151;
        width: 1.4em;
        height: 1.4em;
        text-align: center;
        line-height: 1.4em;
        padding: 0;
      }
      table {
        border-collapse: collapse;
        border: 1px solid #333;
      }
      td {
        border: 1px solid #333;
        text-align: center;
      }
  `
const style = document.createElement('style')
style.innerHTML = styleContent
document.body.appendChild(style)