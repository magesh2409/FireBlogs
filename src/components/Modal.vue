<template>
    <div class="modal">
        <div class="modal-content">
            <p> {{ this.modalMessage }}</p>
            <button @click="clodeModal">Close</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'modal',
    props:['modalMessage'],
    methods:{
        clodeModal(){
            this.$emit('close-modal')
        }
    }
}
</script>

<style lang="scss" scoped>

.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top:0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);

    .modal-content {
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        justify-content: center;
        width: 300px;
        padding: 40px 30px;
        background-color: #fff;
    }

    p {
        text-align: center;
    }

    button {
        align-self: center;
    }
}
</style>