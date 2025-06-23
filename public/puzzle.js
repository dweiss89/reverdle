let PUZZLE = null;
(function(){
  const params = new URLSearchParams(location.search);
  const enc = params.get('puzzle');
  if (enc) {
    try {
      PUZZLE = JSON.parse(atob(enc));
    } catch(e) {
      console.error('Failed to parse puzzle data');
    }
  }
})();
