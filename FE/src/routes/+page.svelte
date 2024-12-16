<script lang="ts">
    import { PUBLIC_URI } from "$env/static/public";
    let {data} = $props()
    let edit = $state(false) 
    const editMode = async() => {
        edit = !edit
    }
</script>
<center>
    {#if data.datas.length > 0}
        {#if !edit}
            <input onclick={editMode} type="button" class="submit" value="Edit Mode">
        {:else}
            <h3>On Editmode</h3>
        {/if}
        {#each data.datas as item}
            <div class="card">
                <div class="top">
                    {#if edit}
                        <form class="form-input" action="?/update" method="post" >
                            <div class="form-input">
                                <input type="text" name="newFileName" value={item.split("_")[0]}>
                                <center>
                                    <input type="submit" value="update" class="submit">
                                </center>
                            </div>
                            <input type="text" name="fileName" hidden value={item}>
                        </form>
                        <hr>
                        <form class="form-input" action="?/delete" method="post">
                            <input type="text" name="fileName" hidden value={item}>
                            <center>
                                <input type="button" value="cancel" onclick={editMode} class="submit ok">
                                <input type="submit" value="delete" class="submit warning">
                            </center>
                        </form>
                    {:else}
                        <span>
                            {item.split("_")[0]}
                        </span>
                    {/if}
                </div>
                <div class="img-container">
                    <img src={`${PUBLIC_URI}/${item}`} alt="img">
                </div>
            </div>
        {/each}
    {:else}
        <span>Don't have any image on your account please goto <a href="/upload">upload</a></span>
    {/if}
</center>