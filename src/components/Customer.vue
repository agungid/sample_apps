<template>
    <div class="customer">
        <h1>List Customers</h1>
        <a href="javascript:;" v-if="!formAdd" class="btn btn-primary" @click="getFormAdd(true)">Add data</a>
        <div class="col-md-3" v-if="formAdd">
            <form class="form" @submit.prevent="saveCustomer(customer)">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="customer.name" placeholder="Name"/>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" v-model="customer.address" placeholder="Address"/>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" v-model="customer.contact" placeholder="Contact"/>
                </div>
                <div class="form-group">
                    <input type="submit" class="btn btn-success" value="Save"> 
                    <input type="button" class="btn btn-danger" @click="getFormAdd(false)" value="Cencel"> 
                </div>
            </form>
            <hr/>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th class="col-md-3">Name</th>
                    <th class="col-md-4">Address</th>
                    <th class="col-md-3">Contact</th>
                    <th class="col-md-2"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="customer in customers" >
                    <td>
                        <span v-if="formEdit == customer.id">
                            <input type="text" class="form-control" v-model="customer.name" placeholder="Name"/>
                        </span>
                        <span v-else>
                            {{customer.name}}
                        </span>
                    </td>
                    <td>
                        <span v-if="formEdit == customer.id">
                            <input type="text" class="form-control" v-model="customer.address" placeholder="Address"/>
                        </span>
                        <span v-else>
                            {{customer.address}}
                        </span>
                    </td>
                    <td>
                        <span v-if="formEdit == customer.id">
                            <input type="text" class="form-control" v-model="customer.contact" placeholder="Contact"/>
                        </span>
                        <span v-else>
                            {{customer.contact}}
                        </span>
                    </td>
                    <td>
                        <span v-if="formEdit == customer.id">
                            <input type="button" class="btn btn-success" @click="patchCustomer(customer.id, customer)" value="Update">
                            <input type="button" class="btn btn-danger" @click="getFormEdit(false)" value="Cencel">
                        </span>
                        <span v-else>
                            <a href="javascript:;" @click="getFormEdit(customer.id)" class="btn btn-warning">Edit</a>
                            <a href="javascript:;" class="btn btn-danger" @click="deleteCustomer(customer.id)">Delete</a>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'customer',
    data() {
        return {
            customer: {
                name:null,
                address:null,
                contact:null
            }
        }
    },
    computed: {
        ...mapState('auth', [
            'user'
        ]),
        ...mapGetters('customers', {
            customers: 'list'
        }),
        ...mapGetters({
            formAdd: 'formAdd',
            formEdit: 'formEdit'
        })
    },
    methods: {
        ...mapActions('customers', {
            findCustomers: 'find',
            createCustomer: 'create',
            updateCustomer: 'patch',
            removeCustomer: 'remove'
        }),
        ...mapActions({
            getFormAdd: 'getFormAdd',
            getFormEdit: 'getFormEdit'
        }),

        //save data
        saveCustomer (data) {
            this.createCustomer(data).then(this.clearInput)
        },

        patchCustomer (id, data) {
            this.updateCustomer([id, data]).then(this.getFormEdit(false))
        },

        deleteCustomer(id) {
            this.removeCustomer(id)
        },

        clearInput () {
            this.customer.name = undefined,
            this.customer.address = undefined,
            this.customer.contact = undefined
        }

    },
    created () {
        if(!this.user) {
            return this.$router.replace({ name: 'login' })
        }

        //get customers
        this.findCustomers({
            $sort: {createdAt: -1},
            $limit: 25
        })
    }
}
</script>

<style scoped>

</style>