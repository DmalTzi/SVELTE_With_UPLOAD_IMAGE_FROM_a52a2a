<script>
// @ts-nocheck

    import {navigating } from '$app/stores';

    let {children, data} = $props()
</script>

<nav class="navbar">
    <div class="nav-sub">
        {#if data.token}
        <a href="/" class="nav-link">
            <span >home</span>
        </a>
        <a href="/upload" class="nav-link">
            <span >upload</span>
        </a>        
        {/if}
    </div>
    <div class="nav-sub">
        {#if data.token}
        <a href="/logout" class="nav-link">
            <span >logout</span>
        </a>
        {:else}
        <a href="/login" class="nav-link">
            <span >login</span>
        </a>
        <a href="/register" class="nav-link">
            <span >register</span>
        </a>
        {/if}
    </div>
</nav>
{@render children()}