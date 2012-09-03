<!-- View: ListPlayers -->
<div id="listplayers">
</div>
<script id="tmpl_listplayers" type="text/x-handlebars-template">
  <ul>
    {{#each players}}
      <li data-gameid="{{id}}">{{name}}</li>
    {{/each}}
  </ul>
</script>
