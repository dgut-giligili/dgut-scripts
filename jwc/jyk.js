for (var i = 1; i <= 15; i++) {
  if (i in { 2: '', 3: '', 5: '', 6: '', 8: '', 10: '' })
    document.getElementById('a' + i + '_2').checked = true;
  else
    document.getElementById('a' + i + '_0').checked = true;
}

fpaper.submit.click();
