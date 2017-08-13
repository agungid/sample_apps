import * as mType from '../mutation-types'

const state = {
    formAdd: false,
    formEdit: false
}

const getters = {
    formAdd: state => state.formAdd,
    formEdit: state => state.formEdit
}

const actions = {
    getFormAdd(context, bool) {
        context.commit(mType.FORM_ADD, bool)
    },
    getFormEdit(context, userid) {
        context.commit(mType.FORM_EDIT, userid)
    }
}

const mutations = {
    [mType.FORM_ADD](state, bool) {
        state.formAdd = bool
    },
    [mType.FORM_EDIT](state, userid) {
        state.formEdit = userid
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}