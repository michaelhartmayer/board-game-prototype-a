<!-- View: ListGames -->
<div id="listgames"></div>

<!-- Template: ListGames -->
<script id="tmpl_listgames" type="text/x-handlebars-template">
  <div>List Games</div>
  <ul>
    {{#each games}}
      <li data-gameid="{{id}}">{{name}}</li>
    {{/each}}
  </ul>
</script>
