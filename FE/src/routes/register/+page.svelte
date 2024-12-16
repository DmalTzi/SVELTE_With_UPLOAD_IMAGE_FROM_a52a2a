<script>
    let {data} = $props()
    console.log(data)
</script>

<div class="container">
    <form method="post" class="card">  
        <div>
            <h3>Register</h3>
        </div>
        <div class="form-input">
            <input type="text" name="userName" placeholder="Username" required>
        </div>
        <div class="form-input">
            <input type="password" name="password" placeholder="Password" required>
        </div>

        <input type="submit" value="register" class="submit">
    </form>
</div>
