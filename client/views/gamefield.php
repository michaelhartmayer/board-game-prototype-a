<!-- GameField -->
<div id="gamefield">
  <!-- UI: Status -->
  <div id="status"></div>
  <script id="tmpl_status" type="text/x-handlebars-template">
    <div class="box-header">STATUS</div>

    <table class="t">
      <!-- player -->
      <tr>
        <td>You</td>
        <td>{{player.name}}</td>
        <td>{{player.chp}} / {{player.mhp}} hp</td>
      </tr>

      <!-- opponent -->
      <tr>
        <td>Opponent</td>
        <td>{{opponent.name}}</td>
        <td>{{opponent.chp}} / {{opponent.mhp}} hp</td>
      </tr>

      <!-- turn info -->
      <tr>
        <td>Turn</td>
        <td colspan="2">
          {{turn.player_name}}
        </td>
      </tr>
    </table>
  </script>

  <!-- UI: Selection -->
  <div id="selection"></div>
  <script id="tmpl_selection" type="text/x-handlebars-template">
    
  </script>

  <!-- UI: Board -->
  <div id="board"></div>
  <script id="tmpl_board" type="text/x-handlebars-template">
    {{#each cols}}
      <div class="col">
      {{#each rows}}
        <div class="col" data-ga-col="{{col}}" data-ga-row="{{row}}"></div>
      {{/each}}
      </div>
    {{/each}}
  </script>
</div>