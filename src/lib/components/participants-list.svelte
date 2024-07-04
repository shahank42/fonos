<script lang="ts">
	import type { RemoteParticipant } from "livekit-client";

  	let { participantsList }: { participantsList: RemoteParticipant[] } = $props();

</script>


<div class="flex flex-col gap-1">
  <span class="">{participantsList.length} viewer{participantsList.length !== 1 ? "s" : ""}</span>
  <ul class="flex flex-col gap-2">
    {#each participantsList as participant}
      <li class="bg-secondary text-secondary-foreground py-2 px-3 rounded-xl">@{participant.identity}</li>
    {/each}
  </ul>
</div>