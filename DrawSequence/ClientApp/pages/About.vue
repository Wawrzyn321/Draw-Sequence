<template>
  <article>
    <page-title title="About"></page-title>
    <h2>About Draw-Sequence</h2>

    <h3>What is this?</h3>
    <p>
      Draw-Sequence is a project where anonymous users can post or draw a
      picture of the next number in a sequence. This number is then checked on
      the server side, using
      <abbr title="Optical Character Recognition">OCR</abbr>.
    </p>

    <h3>What for?</h3>
    <p>This project has been made while learning ASP Core and Vue.js.</p>

    <h3>With what technologies?</h3>
    <ul>
      <li>ASP Core 2.2 with ASP Identity</li>
      <li>Vue.js 2 with Vue Router</li>
      <li>Entity Framework Core</li>
      <li>Jest & XUnit</li>
      <li><a href="https://github.com/tesseract-ocr/">Tesseract</a> for OCR</li>
    </ul>
    <p>Application data is stored in SQL Server database.</p>

    <h3>Source?</h3>
    <p><a href="https://github.com/Wawrzyn321/Draw-Sequence">Github</a></p>
  </article>
</template>

<script>
export default {};
</script>

<style scoped>
h3 {
  margin-top: 16px;
}
</style>
