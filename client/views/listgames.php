<!-- View: ListGames -->
<div class="listgames">
</div>
<script id="tmpl_selection" type="text/x-handlebars-template">
  <ul>
    {{#each games}}
      <li data-gameid="{{id}}">{{name}}</li>
    {{/each}}
  </ul>
</script>
