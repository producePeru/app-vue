<template>
  <div>
    <div class="box">

      <div class="card">
        <input type="radio" name="tab" checked id="home">
        <input type="radio" name="tab" id="blog">
        <input type="radio" name="tab" id="help">
        <input type="radio" name="tab" id="code">
        <input type="radio" name="tab" id="about">
        <div class="list">
          <label for="home" class="home">
            <span class="topic">Inicio</span>
          </label>
          <label for="blog" class="blog">
            <span class="topic">Blog</span>
          </label>
          <label for="help" class="help">
            <span class="topic">Help</span>
          </label>
          <label for="code" class="code">
            <span class="topic">Code</span>
          </label>
          <label for="about" class="about">
            <span class="topic">About</span>
          </label>
          <div class="indicator"></div>
        </div>



        <div class="content">
          <div class="home">
            <div class="sub-title">
              INICIO
            </div>

            <a-divider />


            <div class="txt">
              <ul>
                <li>
                  <span>Ingresar al siguiente link: </span>
                  <a href="https://programa.soporte-pnte.com/" target="_blank">Soporte</a>
                  <img :width="500" src="./img/1.png" />
                </li>
              </ul>
            </div>
          </div>




          <div class="blog">
            <div class="sub-title">
              Blog Content
            </div>
            <hr>
            <div class="txt">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In commodi animi vitae vel, et ratione tenetur
                nemo voluptatem, laboriosam culpa architecto ut minima deleniti. Earum perspiciatis ullam voluptates
                consequuntur rem.
              </p>
            </div>
          </div>
          <div class="help">
            <div class="sub-title">
              Help Content
            </div>
            <hr>
            <div class="txt">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In commodi animi vitae vel, et ratione tenetur
                nemo voluptatem, laboriosam culpa architecto ut minima deleniti. Earum perspiciatis ullam voluptates
                consequuntur rem.
              </p>
            </div>
          </div>
          <div class="code">
            <div class="sub-title">
              Code Content
            </div>
            <hr>
            <div class="txt">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In commodi animi vitae vel, et ratione tenetur
                nemo voluptatem, laboriosam culpa architecto ut minima deleniti. Earum perspiciatis ullam voluptates
                consequuntur rem.
              </p>
            </div>
          </div>
          <div class="about">
            <div class="sub-title">
              About Content
            </div>
            <hr>
            <div class="txt">
              <p>
                ssss Lorem ipsum dolor sit amet consectetur adipisicing elit. In commodi animi vitae vel, et ratione
                tenetur nemo voluptatem, laboriosam culpa architecto ut minima deleniti. Earum perspiciatis ullam
                voluptates consequuntur rem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
label,
span,
div,
p,
b {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

.box {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
}



.box .card {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 5rem;
}

/* To make radio button hidden */
.card input[type="radio"] {
  display: none;
}

.card .list {
  width: 130px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.list label {
  width: 100%;
  height: 50px;
  display: flex;
  padding-left: 20px;
  align-items: center;
  gap: 5px;
  font-size: 17px;
  color: gray;
  z-index: 5;
  cursor: pointer;
}

.list label:hover {
  color: blue;
}

/* To make label color white */
#home:checked~.list .home,
#blog:checked~.list .blog,
#help:checked~.list .help,
#code:checked~.list .code,
#about:checked~.list .about {
  color: white;
}

.list label i {
  font-size: 22px;
}

.list .topic {
  font-size: 14px;
  font-weight: 400;
}

.indicator {
  width: 100%;
  height: 50px;
  background-color: var(--primary);
  border-radius: 10px;
  position: absolute;
  top: 0;
  transition: 0.3s ease-in;
}

/* To move the indicatore based on click */
#home:checked~.list .indicator {
  top: 0;
}

#blog:checked~.list .indicator {
  top: 50px;
}

#help:checked~.list .indicator {
  top: 100px;
}

#code:checked~.list .indicator {
  top: 150px;
}

#about:checked~.list .indicator {
  top: 200px;
}

.card .content {
  width: calc(100% - 150px);
}

/* To hide all the content */
.content .home,
.content .blog,
.content .help,
.content .code,
.content .about {
  display: none;
}

.content .sub-title {
  font-size: 20px;
  font-weight: 500;
}


.content .txt {
  margin-top: 5px;
  // color: gray;
  text-align: justify;
  font-size: 14px;
}

/* To show the content based on selection */

#home:checked~.content .home {
  display: block;
}

#blog:checked~.content .blog {
  display: block;
}

#help:checked~.content .help {
  display: block;
}

#code:checked~.content .code {
  display: block;
}

#about:checked~.content .about {
  display: block;
}

ul {
  li {
    display: flex;
    flex-direction: column;
  }
}
</style>