function alloc(sizeMB, randomRatio) {
  const FLOAT64_BYTES = 8;
  const MB = 1024 * 1024;
  const count = sizeMB* MB / FLOAT64_BYTES * randomRatio;
  // Random content is uncompressable.
  let content = new Float64Array(count);
  for (let i = 0; i < content.length; i++) {
    content[i] = Math.random();
  }
  const count2 = sizeMB* MB / FLOAT64_BYTES * (1 - randomRatio);
  let content2 = new Float64Array(count2);
  for (let i = 0; i < content2.length; i++) {
    content2[i] = 1;
  }
  return [content, content2];
}
$(document).ready(function() {
  var url = new URL(window.location.href);
  var allocMB = parseInt(url.searchParams.get("alloc"));
  if (isNaN(allocMB))
    allocMB = 800;
  var randomRatio = parseFloat(url.searchParams.get("ratio"));
  if (isNaN(randomRatio))
    randomRatio = 0.666

  var startTime = new Date();
  // Assigns the content to docuement to avoid optimization of unused data.
  document.out = alloc(allocMB, randomRatio);
  var ellapse = (new Date() - startTime) / 1000;
  // Shows the loading time for manual test.
  $("#display").text(`Allocating ${allocMB} MB takes ${ellapse} seconds. Ratio: ${randomRatio}`);
});

