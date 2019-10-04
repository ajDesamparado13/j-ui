<template>
    <transition :name="animation">
    <div v-if="isActive" class="ui-dialog dialog is-active" :class="classes">
        <div class="dialog-background" @click="cancel('outside')"/>
            <div class="dialog-content animation-content">
                <header class="dialog-head is-relative" >
                    <ui-close-button v-if="closable" direct-emit @click="cancel('outside')"></ui-close-button>
                    <p class="dialog-title" v-html="title"></p>
                </header>

                <section
                    class="dialog-body is-relative"
                    :class="{ 'is-titleless': !title, 'is-flex': hasIcon }">
                    <div class="media">
                        <div class="media-left" v-if="hasIcon">
                            <ui-icon
                                :icon="icon ? icon : iconByType"
                                :pack="iconPack"
                                :type="type"
                                :both="!icon"
                                size="is-large"/>
                        </div>
                        <div class="media-content">
                            <p v-html="message"/>

                                <div v-if="hasInput" class="field">
                                    <div class="control">
                                        <input
                                            v-model="prompt"
                                            class="input"
                                            ref="input"
                                            :class="{ 'is-danger': validationMessage }"
                                            v-bind="inputAttrs"
                                            @keyup.enter="confirm">
                                    </div>
                                    <p class="help is-danger">{{ validationMessage }}</p>
                                </div>
                        </div>
                    </div>
                </section>

                <footer class="dialog-foot is-relative">
                    <button
                        v-if="showCancel"
                        class="button is-default"
                        ref="cancelButton"
                        @click="cancel('button')">
                        {{ cancelText }}
                    </button>
                    <button
                        class="button"
                        :class="type"
                        ref="confirmButton"
                        @click="confirm">
                        {{ confirmText }}
                    </button>
                </footer>
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
import Icon from '../icon'
import { Modal } from '../modal'
import utils from '../utils'
import helpers from '../helpers'

const config = utils.config
const removeElement = helpers.util.removeElement;

export default {
    name: 'ui-dialog',
    components: {
        [Icon.name]: Icon
    },
    extends: Modal,
    props: {
        title: String,
        message: String,
        icon: String,
        iconPack: String,
        hasIcon: Boolean,
        type: {
            type: String,
            default: 'is-primary'
        },
        confirmText: {
            type: String,
            default: () => {
                return config.defaultDialogConfirmText
                    ? config.defaultDialogConfirmText
                    : 'OK'
            }
        },
        cancelText: {
            type: String,
            default: () => {
                return config.defaultDialogCancelText
                    ? config.defaultDialogCancelText
                    : 'Cancel'
            }
        },
        hasInput: Boolean, // Used internally to know if it's prompt
        inputAttrs: {
            type: Object,
            default: () => ({})
        },
        onConfirm: {
            type: Function,
            default: () => {}
        },
        onClose: {
            type: Function,
            default: () => {}
        },
        closable:{
            type:Boolean,
            default:false,
        },
        classes:{
            type:[String,Array],
            default:'',
        },
    },
    data() {
        const prompt = this.hasInput
            ? this.inputAttrs.value || ''
            : ''

        return {
            prompt,
            isActive: false,
            validationMessage: ''
        }
    },
    computed: {
        /**
         * Icon name (MDI) based on the type.
         */
        iconByType() {
            switch (this.type) {
                case 'is-info':
                    return 'information'
                case 'is-success':
                    return 'check-circle'
                case 'is-warning':
                    return 'alert'
                case 'is-danger':
                    return 'alert-circle'
                default:
                    return null
            }
        },
        showCancel() {
            return this.cancelOptions.indexOf('button') >= 0
        }
    },
    methods: {
        /**
         * If it's a prompt Dialog, validate the input.
         * Call the onConfirm prop (function) and close the Dialog.
         */
        confirm() {
            if (this.$refs.input !== undefined) {
                if (!this.$refs.input.checkValidity()) {
                    this.validationMessage = this.$refs.input.validationMessage
                    this.$nextTick(() => this.$refs.input.select())
                    return
                }
            }

            this.onConfirm(this.prompt)
            this.close(true)
        },

        /**
         * Close the Dialog.
         */
        close(confirm=false) {
            this.isActive = false
            if(!confirm || confirm == 'button'){
                this.onClose();
            }
            // Timeout for the animation complete before destroying
            setTimeout(() => {
                this.$destroy()
                removeElement(this.$el)
            }, 150)
        }
    },
    beforeMount() {
        // Insert the Dialog component in body tag
        document.body.appendChild(this.$el)
    },
    mounted() {
        this.isActive = true

        if (typeof this.inputAttrs.required === 'undefined') {
            this.$set(this.inputAttrs, 'required', true)
        }

        this.$nextTick(() => {
            // Handle which element receives focus
            this.hasInput
                ? this.$refs.input.focus()
                : this.$refs.confirmButton.focus()
        })
    }
}
</script>


<style lang="scss">
.dialog,.dialog-content{
    z-index:9999;
}
.dialog{
    @include overlay(0);
    overflow: hidden;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    position: fixed;
    z-index: $modal-z;

    .dialog-background{
        @include overlay(0);
        background-color: $modal-background-background-color;
    }
    .media-content{
        text-align:center;
    }
    .dialog-head{
        padding:30px 0px;
    }
    .dialog-body,.dialog-foot{
        padding:20px 0px;
    }
    @media only screen and (min-width:$bp-hands-wide){
        .dialog-foot,.dialog-body,.dialog-head{
            padding:20px 40px;
        }
    }

    .dialog-content{
        padding:0.75em;
        background-color:white;
        border-radius: 5px;
    }
    .dialog-head, .dialog-foot{
        background-color:white;
        border-bottom:0px;
        border-radius: 0px;
        border-top:0px;
    }
    .dialog-foot{
        .button{
            margin:0px;
            width:150px;
            height:40px;
        }
        @media only screen and (max-width: 480px){
            .button:not(:last-child){
                margin-bottom:10px;
            }
        }
        @media only screen and (min-width: 480px){
            .button:not(:last-child){
                margin-right:10px;
            }
        }
    }
}

</style>
