<script>
    let files = $state()
    let image = $state()
    $effect(() => {
        if(files) {
            image = URL.createObjectURL(files[0])
        }
    })
</script>

<div class="container">
    <form method="post" enctype=multipart/form-data class="card">  
        <div>
            <h3>Upload File</h3>
        </div>

        {#if files}
            <div class="img-container">
                <img src={image} alt="">
            </div>
        {/if}

        <div class="form-input">
            <input type="file" name="file" accept="image/png, image/jpeg" bind:files>
        </div>
        {#if files}
        <div class="form-input">
            <input type="text" name="pictureName" required placeholder="Image Name">
        </div>

        <input type="submit" value="upload" class="submit">
        {/if}
    </form>
</div>
