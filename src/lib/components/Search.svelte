<script lang="ts">
    import type { Search } from '../../../types/search.ts';
    import { BASE_URL } from '$lib/utils/url.ts';
    import SearchResult from './SearchResult.svelte';
    export let nav = false;
    let input = '';
    let suggestions: Search['packages'] = [];
    let showSuggestions = false;
    async function getSuggestions(input: string) {
        if (input.trim() != '') {
            const suggestions = await fetch(
                `${BASE_URL}/suggestions?q=${input}&size=3`,
            );
            if (!suggestions.ok) {
                return [];
            }
            const pkg_suggestions: Search['packages'] =
                await suggestions.json();
            return pkg_suggestions;
        }
        return [];
    }
</script>

<div class="flex flex-col">
    <form action="/search" autocomplete="off">
        <input
            name="q"
            placeholder="Search Packages..."
            on:input={async (e) => {
                input = e.currentTarget.value;
                suggestions = await getSuggestions(input);
                showSuggestions = true;
            }}
            required
            class="{nav
                ? 'w-64'
                : 'w-96'} rounded-xl border-2 border-black bg-primary p-3 dark:border-white dark:bg-primary_dark"
        />
    </form>
    {#if suggestions.length > 0 && input.trim() != ''}
        {#if showSuggestions}
            <div
                class="{nav ? 'w-64' : 'w-96'} pt-2 {nav && 'absolute top-14'}"
            >
                {#each suggestions as s}
                    <SearchResult
                        date={s.date}
                        description={s.description}
                        keywords={s.keywords}
                        name={s.name}
                        publisher={s.publisher}
                        version={s.version}
                        small
                    />
                {/each}
            </div>
        {/if}
    {/if}
</div>
