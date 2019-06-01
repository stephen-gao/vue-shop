<template>
    <div class="main-container">
        <el-row>
            <el-col :span="6">
                <div class="table-head-box">
                    <el-input class="table-input" v-model="requestData.code" placeholder="请输入用户名"
                              @keyup.enter.native="keyupEnter"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div></div>
            </el-col>
            <el-col :span="6">
                <div></div>
            </el-col>
            <el-col :span="6">
                <div class="table-head-box">
                    <el-button type="primary" size="medium " @click="queryData">刷新数据</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <div class="table-head-box">
                    <el-button type="primary" size="medium" @click="dialogDicTypeVisible=true">添加</el-button>
                </div>
            </el-col>
        </el-row>
        <el-table class="table-body" :data="list" row-key="id" stripe v-loading.body="listLoading"
                  element-loading-text="Loading" border fit highlight-current-row>
            <!--<el-table-column prop="id" label="ID"/>-->
            <el-table-column prop="id" label="ID">
            </el-table-column>
            <el-table-column prop="code" label="编码">
            </el-table-column>
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="sort" label="排序">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="dicItemList(scope.row)">子节点</el-button>
                    <el-button type="danger" size="mini" @click="delDicType(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="table-pagenation">
            <el-pagination
                    background
                    @size-change="handlePageChange"
                    @current-change="handlePageChange"
                    :current-page="pageNum"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    layout="prev, pager, next, sizes, total"
                    :total="total">
            </el-pagination>
        </div>
        <el-dialog title="添加字典分类" :visible.sync="dialogDicTypeVisible">
            <el-form :model="sysDicType" :rules="rules" ref="sysDicType" status-icon label-width="100px">
                <el-form-item label="ID" hidden>
                    <el-input v-model="sysDicType.id"></el-input>
                </el-form-item>
                <el-form-item label="字典名称" prop="name">
                    <el-input v-model="sysDicType.name"></el-input>
                </el-form-item>
                <el-form-item label="字典值" prop="code">
                    <el-input v-model="sysDicType.code"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="sysDicType.sort"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addSysDicType()">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="字典项列表" :visible.sync="dialogDicItemTableVisible" before-close="alert('a')">
            <div style="text-align: left;margin-bottom: 10px;">
                <el-button type="primary" size="medium " @click="dialogDicItemVisible=true">添加字典值</el-button>
            </div>
            <el-table :data="sysDicItemList">
                <el-table-column prop="name" label="字典值名称"></el-table-column>
                <el-table-column prop="code" label="字典值编码"></el-table-column>
                <el-table-column prop="typeCode" label="字典分类"></el-table-column>
                <el-table-column prop="sort" label="排序"></el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="添加字典项" :visible.sync="dialogDicItemVisible">
            <el-form :model="sysDicItem" :rules="rules" ref="sysDicItem" status-icon label-width="100px">
                <el-form-item label="ID" hidden>
                    <el-input v-model="sysDicItem.typeId"></el-input>
                </el-form-item>
                <el-form-item label="ID" hidden>
                    <el-input v-model="sysDicItem.typeCode"></el-input>
                </el-form-item>
                <el-form-item label="ID" hidden>
                    <el-input v-model="sysDicItem.id"></el-input>
                </el-form-item>
                <el-form-item label="字典名称" prop="name">
                    <el-input v-model="sysDicItem.name"></el-input>
                </el-form-item>
                <el-form-item label="字典值" prop="code">
                    <el-input v-model="sysDicItem.code"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="sysDicItem.sort"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addSysDicItem()">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ElRow from "element-ui/packages/row/src/row";
    import ElCol from "element-ui/packages/col/src/col";
    import ElInput from "element-ui/packages/input/src/input";
    import sysdic from "@/api/sysdic"
    export default{
        components: {
            ElInput,
            ElCol,
            ElRow
        },
        data(){
            return {
                list: [],
                pageNum: 1,
                pageSizes: [10, 20, 30, 40, 50],
                pageSize: 10,
                total: 4,
                requestData: {
                    pageNum: null,
                    pageSize: null,
                    code: null
                },
                loading: false,
                sysDicType:{
                    id: '',
                    code:'',
                    name:'',
                    sort: 1
                },
                dialogDicTypeVisible: false,
                rules: {
                    name: [
                        {required: true, message: '请输入字典名称', trigger: 'blur'},
                    ],
                    code: [
                        {required: true, message: '请输入字典编码', trigger: 'blur'},
                    ]
                },
                dialogDicItemTableVisible: false,
                sysDicItemList:[],
                dialogDicItemVisible: false,
                sysDicItem:{
                    id: '',
                    name:'',
                    code:'',
                    typeId:'',
                    typeCode:'',
                    sort:''
                }

            }
        },
        filters: {

        },
        created() {
            this.queryData()
        },
        methods: {
            queryData() {
                this.loading = true;
                sysdic.page(this.requestData).then(response => {
                    this.list = response.data.records;
                    this.total = response.data.total;
                    this.pageNum = response.data.offset;
                    this.pageSize = response.data.size;
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },
            keyupEnter(){
                this.$message({
                    message: '待实现',
                    type: 'warning',
                    duration: 3000
                })
            },
            handlePageChange(){
                this.$message({
                    message: '待实现',
                    type: 'warning',
                    duration: 3000
                })
            },
            addSysDicType(){
                this.$refs.sysDicType.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        sysdic.addDicType(this.sysDicType).then(response => {
                            this.loading = false;
                            this.$message({
                                message: response.message,
                                type: 'success',
                                duration: 3000
                            });
                            this.formRefrash();
                            this.queryData();
                            this.dialogDicTypeVisible = false;
                        }).catch(() => {
                            this.loading = false;
                        })
                    } else {
                        this.$message({
                            message: '请正确填写表单',
                            type: 'error',
                            duration: 3000
                        });
                        return false;
                    }
                });
            },
            dicItemList(row){
                this.dialogDicItemTableVisible = true;
                this.sysDicItem.typeId = row.id;
                this.sysDicItem.typeCode = row.code;
                this.dicItemListById(row.id)
            },
            dicItemListById(id){
                this.loading = true;
                sysdic.dicItemsByTypeId({typeId:id}).then(response => {
                    this.sysDicItemList = response.data;
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },
            addSysDicItem(){
                this.$refs.sysDicItem.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        sysdic.addDicItem(this.sysDicItem).then(response => {
                            this.loading = false;
                            this.$message({
                                message: response.message,
                                type: 'success',
                                duration: 3000
                            });
                            this.formRefrash();
                            this.dicItemListById(this.sysDicItem.typeId)
                            this.dialogDicItemVisible = false;
                        }).catch(() => {
                            this.loading = false;
                        })
                    } else {
                        this.$message({
                            message: '请正确填写表单',
                            type: 'error',
                            duration: 3000
                        });
                        return false;
                    }
                });
            },
            delDicType(row){
                this.$message({
                    message: '待实现',
                    type: 'warning',
                    duration: 3000
                })
            },
            formRefrash(){
                this.sysDicType = {
                    id: '',
                    code:'',
                    name:'',
                    sort: 1
                };
                this.sysDicItem.name='';
                this.sysDicItem.code='';

            }
        }
    }
</script>

<style scoped>
    @import "../../styles/tablePage.scss";
</style>