<template>
  <div>

    <section v-if="active == 'files'">
      <h3>MIS CARPETAS</h3>
      
      <a-button style="margin: 1rem 0 1.5rem 0;" class="btn-produce" type="primary" @click="showDrawer">NUEVO</a-button>
      
      
      
      <div class="file-wrapper" >
        <div v-for="(file) in files" :key="file.id">
          <div class="file" @contextmenu.prevent="showContextMenu('customMenu', $event, file)">
            <FolderFilled class="ico" :style="{ color: file.color }" @click="handleShowFiles(file)" />
            <span class="text">{{ file.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <a-spin :spinning="spinning">
      <section class="section-table" v-if="active == 'table'">
        <CloseOutlined class="close" @click="active = 'files'" />
        <TablaArchivos :idFile="idFile" @handleDeleteItem="handleDeleteItem" />
      </section>
    </a-spin>


    <!-- Menú contextual -->
    <div v-if="menuToShow" class="context-menu" :style="{ top: menuTop + 'px', left: menuLeft + 'px' }">
      <ul>
        <li v-for="item in menuToShow.items" :key="item.label" @click="menuItemClicked(item)">
          {{ item.label }}
        </li>
      </ul>
    </div>

    <a-drawer v-model:open="open" title="Nueva carpeta" placement="right" @close="handleCloseDrawer">
      <a-form layout="vertical" :model="formState" name="basic" @finish="onSubmit" @finishFailed="onFinishFailed">
        <a-form-item label="Nombre de la carpeta" name="name"
          :rules="[{ required: true, message: 'Escribe un nombre del archivo' }]">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="Color de la carpeta" name="color">
          <input type="color" v-model="formState.color">
        </a-form-item>
        <a-form-item>
          <a-button class="btn-produce" type="primary" html-type="submit" :loading="loading">{{ isUpdate ? 'ACTUALIZAR': 'CREAR' }}</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>



  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { FolderFilled, CloseOutlined } from '@ant-design/icons-vue';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import TablaArchivos from './ArchivosFolder.component.vue';

const spinning = ref(false);
const folderSelected = ref(null);
const isUpdate = ref(null);
const active = ref('files');
const open = ref(false);
const loading = ref(false);
const files = ref(null);
const idFile = ref(null);
const menuToShow = ref(null);
const menuLeft = ref(0);
const menuTop = ref(0);
const formState = reactive({
  name: '',
  color: '#000000'
});
const menus = {
  customMenu: {
    items: [
      { label: 'Abrir' },
      { label: 'Editar' },
      { label: 'Eliminar' }
    ]
  }
};

const showContextMenu = (menuName, event, file) => {
  event.preventDefault();
  menuToShow.value = menus[menuName];
  menuLeft.value = event.clientX;
  menuTop.value = event.clientY;
  window.addEventListener('click', handleClickOutside);
  folderSelected.value = file;
};
const handleClickOutside = (event) => {
  if (!event.target.closest('.context-menu')) {
    menuToShow.value = null;
    window.removeEventListener('click', handleClickOutside);
  }
};
const menuItemClicked = (item) => {
  menuToShow.value = null;
  if (item.label == 'Abrir') handleShowFiles(folderSelected.value)
  if (item.label == 'Editar') handleEditFiles(folderSelected.value)

};

const handleCloseDrawer = () => {
  open.value = false;
  formState.name = '';
  formState.color = '#000000';
  isUpdate.value = null;
}
const showDrawer = () => {
  open.value = true;
};
const handleDeleteItem = (val) => {
  handleShowFiles(val);
};

const handleShowFiles = async (val) => {
  spinning.value = true;
  active.value = null;
  try {
    const { data } = await makeRequest({ url: `drive/data-files/${val.id}`, method: 'GET' });

    const values = {
      "id": val.id,
      "dataSource": data.data,
      "total": data.total,
      'nameFolder': val.name
    }

    idFile.value = values;
    active.value = 'table';

  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    spinning.value = false;
  }
}
const handleEditFiles = (val) => {
  formState.name = val.name
  formState.color = val.color
  open.value = true;
  isUpdate.value = val.id;
}
const onSubmit = async () => {
  loading.value = true;
  try {
    let data;

    if (isUpdate.value) {
      data = await makeRequest({ url: `drive/update-file/${isUpdate.value}`, method: 'PUT', data: formState });
    } else {
      data = await makeRequest({ url: 'drive/create-file', method: 'POST', data: formState });
    }

    if (data.status == 200) {
      formState.name = null
      open.value = false;
      message.success(data.message);
      fetchData()
      isUpdate.value = null;
    }
  } catch (error) {
    message.error('No tienes permisos');
  } finally {
    loading.value = false;
  }

};
const onFinishFailed = () => {
  console.log('Failed:');
};

const fetchData = async () => {
  try {
    const { data } = await makeRequest({ url: 'drive/files', method: 'GET' });
    files.value = data;
  } catch (error) {
    console.error('Error de red:', error);
  }
}
onMounted(() => {
  fetchData();
});


</script>

<style>
.context-menu {
  position: fixed;
  background-color: white;
  border: 1px solid #ccc;
  padding: 5px 0;
  border-radius: 3px;
}

.context-menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.context-menu ul li {
  padding: 5px 14px;
  cursor: pointer;
  font-size: 13px;
}

.context-menu ul li:hover {
  background-color: #f0f0f0;
}
</style>

<style lang="scss" scoped>
.file-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: .2rem;

  .file {
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .ico {
      cursor: pointer;
      font-size: 60px;
    }

    .text {
      text-align: center;
    }
  }
}

.file-options {
  display: flex;

  span {
    padding: .1rem .5rem;
    width: 50px;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      color: #BA0F0F;
    }
  }
}

.section-table {
  position: relative;

  .close {
    position: absolute;
    right: 2px;
    font-size: 16px;
    cursor: pointer;
    color: #7b7b7b;

    &:hover {
      color: #BA0F0F;
    }
  }
}
</style>