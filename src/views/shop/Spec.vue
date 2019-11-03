<template>
    <div style="height: 100%">
        <el-container>
            <el-aside style="border-right: 3px solid #304156;min-height: 100%">
                <el-row style="text-align: left;padding-top: 5px;padding-left: 30px;padding-bottom: 10px;">
                    <el-switch
                            style="display: block"
                            v-model="requestDate.type"
                            active-color="#13ce66"
                            inactive-color="#13ce66"
                            active-text="商品属性树"
                            inactive-text="sku规格树"
                            active-value="0"
                            inactive-value="1"
                            @change="specTypeChange">
                    </el-switch>
                </el-row>
                <el-tree :data="specTree"
                         :props="defaultProps"
                         node-key="id"
                         default-expand-all
                         :expand-on-click-node="false"
                         @node-click="handleNodeClick">
                </el-tree>
            </el-aside>
            <el-main>
                <el-row>
                    <el-col :span="6">
                        <div class="table-head-box">
                            <el-button type="primary" size="medium" @click="dialogAddSpecTreeVisible=true">添加
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-table class="table-body" :data="specList" row-key="id" stripe v-loading.body="listLoading"
                          element-loading-text="正在加载" border fit highlight-current-row>
                    <el-table-column prop="specName" label="规格名称">
                    </el-table-column>
                    <el-table-column prop="specValue" label="规格值">
                    </el-table-column>
                    <el-table-column prop="specFlag" label="规格标识">
                        <template slot-scope="scope">
                            <span>{{scope.row.specFlag | handlerFomartDicItem(sysDicSpecTreeFlag)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sort" label="排序">
                    </el-table-column>
                    <el-table-column prop="gmtCreate" label="创建时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.gmtCreate | handlerFomartTime()}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="gmtUpdate" label="编辑时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.gmtCreate | handlerFomartTime()}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="getDetail(scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="remove(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="用户" width="500px" :visible.sync="dialogAddSpecTreeVisible">
                    <div style="text-align: left">
                        <el-form style="width: 400px" :model="spec" :rules="rules" ref="spec" status-icon
                                 label-width="100px"
                                 size="small">
                            <el-form-item label="id" hidden>
                                <el-input v-model="spec.id"></el-input>
                            </el-form-item>
                            <el-form-item label="父级节点" prop="parentName">
                                <el-input v-model="spec.parentName" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="规格名称" prop="specName">
                                <el-input v-model="spec.specName"></el-input>
                            </el-form-item>
                            <el-form-item label="规格值" prop="specValue">
                                <el-input v-model="spec.specValue"></el-input>
                            </el-form-item>
                            <el-form-item label="规格标识" prop="specFlag">
                                <el-select v-model="spec.specFlag" placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in specTreeFlags"
                                               :key="item.code"
                                               :label="item.name"
                                               :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="排序">
                                <el-input v-model="spec.sort"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" v-if="!spec.id" @click="add()" :loading="loading">添加
                                </el-button>
                                <el-button type="primary" v-if="spec.id" @click="edit()" :loading="loading">编辑
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-dialog>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
    import specApi from '@/api/spec'
    import {parseTime} from "@/utils/formatUtils"
    import sysDic from "@/api/sysdic"
    import {sysDicFormat} from "@/utils/sysDicFormater"
    import console from 'console'
    export default {
        components: {
            ElInput
        },
        name: "Spec",
        data() {
            return {
                specTree: [],
                specList: [],
                defaultProps: {
                    children: 'children',
                    label: 'specName'
                },
                requestDate: {
                    type: '1',
                    parentId: '0'
                },
                listLoading: false,
                spec: {
                    id: null,
                    specName: '',
                    specValue: '',
                    parentId: '',
                    parentName: '',
                    specFlag:'',
                    type: '',
                    sort: ''
                },
                parentName:'sku规格树',
                dialogAddSpecTreeVisible: false,
                rules: {
                    parentName: [
                        {required: true, message: '请输入选择父节点', trigger: 'blur'},
                    ],
                    specName: [
                        {required: true, message: '请输入规格名称', trigger: 'blur'},
                    ],
                    specValue: [
                        {required: true, message: '请输入规格值', trigger: 'blur'},
                    ],
                    specFlag: [
                        {required: true, message: '请选择规格标识', trigger: 'blur'},
                    ],

                },
                loading: false,
                validateValue: true,
                sysDicSpecTreeFlag: 'spec_tree_item_flag',
                specTreeFlags: null,

            }
        },
        filters: {
            handlerFomartTime(data) {
                return parseTime(data)
            },
            handlerFomartDicItem(data, type){
                return sysDicFormat(type, data)
            }
        },
        created() {
            this.queryTree();
            this.queryList();
            this.querySysDic()
        },
        methods: {
            queryTree() {
                specApi.specTree({type: this.requestDate.type}).then(response => {
                    this.specTree = response.data;
                }).catch(() => {

                })
            },
            queryList() {
                this.listLoading = true;
                specApi.specList(this.requestDate).then(response => {
                    this.listLoading = false;
                    this.specList = response.data;
                }).catch(() => {
                    this.listLoading = false;
                })
            },
            querySysDic(){
                sysDic.dicitemsbtypeCode({typeCode: this.sysDicSpecTreeFlag}).then(response => {
                    this.specTreeFlags = response.data;
                }).catch(() => {

                })
            },
            specTypeChange(){
                this.spec.parentId = '0';
                this.spec.parentName = '';
                this.requestDate.parentId = '0';
                this.queryTree();
                this.queryList();
            },
            handleNodeClick(data){
                console.log(data);
                if(data.specFlag === 1){
                    this.$message({
                        message: '请选择规格分类节点',
                        type: 'warning',
                        duration: 3000
                    });
                    return;
                }
                this.requestDate.parentId = data.id;
                this.spec.parentId = data.id;
                this.spec.parentName = data.specName;
                this.parentName = data.specName;
                this.spec.type = data.type;
                this.queryList();
            },
            validate(){
                this.$refs.spec.validate((valid) => {
                    if (valid) {
                        this.validateValue = false
                    }
                })
            },
            refreashForm(){
                this.spec.specName = '';
                this.spec.specValue = ''

            },
            add(){
                this.validate();
                if (this.validateValue) {
                    this.$message({
                        message: '请正确填写表单',
                        type: 'error',
                        duration: 3000
                    });
                    return;
                }
                this.loading = true;
                specApi.add(this.spec).then(response => {
                    this.loading = false;
                    if (response.code === 10000) {
                        this.$message({
                            message: response.message,
                            type: 'success',
                            duration: 3000
                        });
                        this.queryTree();
                        this.queryList();
                        this.refreashForm();
                        this.dialogAddSpecTreeVisible = false;
                    }
                }).catch(() => {
                    this.loading = false;
                })
            },
            getDetail(data){
                this.spec = data;
                this.spec.parentName = this.parentName;
                this.dialogAddSpecTreeVisible=true;
            },
            edit(){
                this.validate();
                if (this.validateValue) {
                    this.$message({
                        message: '请正确填写表单',
                        type: 'error',
                        duration: 3000
                    });
                    return;
                }
                specApi.edit(this.spec).then(response => {
                    if (response.code === 10000) {
                        this.$message({
                            message: response.message,
                            type: 'success',
                            duration: 3000
                        });
                        this.queryTree();
                        this.queryList();
                        this.refreashForm();
                        this.dialogAddSpecTreeVisible = false;
                    }
                }).catch(() => {
                })
            },
            remove(data){
                specApi.del({id:data.id}).then(response => {
                    if (response.code === 10000) {
                        this.$message({
                            message: response.message,
                            type: 'success',
                            duration: 3000
                        });
                        this.queryTree();
                        this.queryList();
                    }
                }).catch(() => {
                })
            }
        }

    }
</script>
<style scoped>
    @import "../../styles/tablePage.scss";
</style>