<template>
    <div>
        <h2>Google Drive 圖片</h2>
        <img :src="imageUrl" alt="Google Drive 圖片" class="preview-image" @click="showModal = true" />

        <!-- Modal 放大圖 -->
        <div v-if="showModal" class="modal" @click="showModal = false">
            <img :src="imageUrl" alt="放大圖" class="modal-image" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showModal: false,
            imageUrl: 'https://i.imgur.com/a2Tpu8x.jpeg' // 替換為您的圖片 URL
        }
    }
}
</script>

<style scoped>
.preview-image {
    width: 300px;
    cursor: pointer;
    transition: 0.3s;
    border: 2px solid #ccc;
    border-radius: 8px;
}

.preview-image:hover {
    opacity: 0.8;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-image {
    max-width: 90%;
    max-height: 90%;
    border: 4px solid white;
    border-radius: 10px;
}
</style>