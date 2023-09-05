import React from "react";
import { Button,Tag,Table,Popconfirm,Modal,Form,Input,DatePicker,message } from "antd";
import './task.css';
import '../api/index';
import { getTaskList } from "../api/index";

// 对日期处理的方法
const zero = function zero(text) {
    text = String(text);
    return text.length < 2 ? '0' + text : text;
}
const formatTime = function formatTime(time) {
    let arr = time.match(/\d+/g),
        [,month,day,hours = '00',minutes = '00'] = arr;
        // 不存在时设置默认值
    return `${zero(month)}-${zero(day)} ${zero(hours)}:${zero(minutes)}`;
};

class Task extends React.PureComponent{
    // 表格列的数据
    columns=[{
        title:'编号',
        dataIndex:'id',
        align:'center',
    },{
        title:'任务描述',
        dataIndex:'task',
        // 设置不自动换行，删除多余的信息
        ellipsis:true,
        // 按百分比设置宽度
        width:'30%',
    },{
        align:'center',
        title:'状态',
        // 指定字段名
        dataIndex:'state',
        // 想要渲染出更复杂的内容或者根据逻辑呈现不同信息等都基于render进行处理
        // 有多少行，render执行多少次
        //      text：当前这一行，这一列单元格中存储的内容
        //      record：这一行的完整数据[对象]
        //      index；这一行的索引
        // 函数最后返回的值，就是单元格最后渲染的内容
        render:(text,record) => {
            return +text === 1 ? '未完成':'已完成'
        }
    },{
        align:'center',
        title:'完成时间',
        dataIndex:'time',
        render:(_,record) => {
            let { state,time,complete} = record;
            if (+state === 2) time = complete;
            return formatTime(time);
        }
    },{
        title:'操作',
        render:(_,record) => {
            let {state} = record;
            return <>
                <Popconfirm title="你确定要删除此任务吗？">
                    <Button type="link">删除</Button>
                </Popconfirm>
                {+state != 2 ?<Popconfirm title="你确定设置此任务为完成吗？">
                    <Button type="link">完成</Button>
                </Popconfirm>:null}
            </>
        }
    }];
    // 初始组件的状态
    state = {
        tableDate:[{
            id:1,
            task:'今天天气很不错，今夜阳光明媚',
            state:1,
            time:'2022-11-29 18:00:00',
            complete:'2022-11-29 18:00:00'
        },{
            id:2,
            task:'我们需要把React基础知识背下来',
            state:2,
            time:'2022-11-30 18:00:00',
            complete:'2022-11-29 18:00:00'
        }],
        tableLoading:false,
        ModalVisible:false,
        confirmLoading:false,
        selectIndex:0,
        // ruleForm:{
        //     task:'',
        //     time:''
        // },
    };
    // 对话框和表单处理的两个方法
    closeModal = () => {
        this.setState({
            ModalVisible:false,
            confirmLoading:false
        });
        this.formIns.resetFields();
    } 
    submit = async() => {
        try{
            await this.formIns.validateFields();
            let {task,time} = this.formIns.getFieldValue();
            // console.log(data);
            time = time.format('YYYY-MM-DD HH:mm:ss');
            console.log(time)
            message.success('表单校验通过');}
        catch(_){}
    }
    // 关于table数据的处理
    // 从服务器获取指定状态的任务
    queryData = async () => {
        let {selectIndex} = this.state;
        try{let {code,list}=await getTaskList(selectIndex);}
        catch(_){}
    }
    // 选中状态切换
    changeIndex = (index) => {
        if(this.state.selectIndex === index) return;
        // 注：setstate是异步操作，得放在回调函数或flushSync（让setstate立即更新）中中执行获取状态的任务
        this.setState({
            selectIndex:index
        },()=>{
            // this.queryData();
        })
    } 
    render(){
        return <div className="task-box">
            {/* 头部 */}
            <div className="header">
                <h2 className="title">
                    TASK OA 任务管理系统
                </h2>
                <Button type="primary" onClick={()=>{
                    this.setState({
                        ModalVisible:true
                    })
                }}>新增任务</Button>
            </div>
            {/* 标签 */}
            <div className="tag-box">
                {['全部','未完成','已完成'].map((item,index) => {
                    return <Tag key={index} color={this.state.selectIndex===index?'#1677ff':''}
                            onClick={this.changeIndex.bind(null,index)}>
                        {item}
                    </Tag>
                })}
                {/* <Tag>全部</Tag>
                <Tag>未完成</Tag>
                <Tag>已完成</Tag> */}
            </div>
            {/* 表格 */}
            {/* 注：rowkey必须指定且为唯一值 */}
            <Table dataSource={this.state.tableDate} 
                    columns={this.columns} 
                    loading={this.state.tableLoading} 
                    pagination={false} 
                    rowKey="id">
            </Table>
            {/* 对话框 & 表单 */}
            <Modal title="新增任务窗口" open={this.state.ModalVisible} confirmLoading={this.state.confirmLoading} keyboard={false} 
            mask={false} okText="确认提交" onCancel={this.closeModal} onOk={this.submit}>
                 {/* confirmLoading:控制确定按钮的loading状态：提交的反抖处理 */}
                 <Form ref={x=> this.formIns = x} layout="vertical" initialValues={{task:'',time:''}}>
                    <Form.Item label="任务描述" name="task" validateTrigger="onBlur" 
                        rules={[{required:true,message:'任务描述是必填项'}
                        ,{min:6,message:"输入长度至少是六位及以上"}
                        ]}>
                        <Input.TextArea rows={4}></Input.TextArea>
                    </Form.Item>
                    <Form.Item label="预计完成时间" name="time" validateTrigger="onBlur" rules={[{required:true,message:'预计完成时间是必填项'}]}>
                        <DatePicker showTime></DatePicker>
                    </Form.Item>
                </Form>
                 {/* 手动实现表单操作 */}
                 {/* <Form>
                    <Form.Item>
                        <Input.TextArea rows={4} value={this.state.ruleForm.task} onChange={(ev) => {
                        let target = ev.target,
                            text = target.value.trim();
                            this.setState({
                                ruleForm:{
                                    ...this.state.ruleForm,
                                    task:text
                                }
                            })
                        }}></Input.TextArea>
                    </Form.Item>
                    <Form.Item>
                        <DatePicker showTime value={this.state.ruleForm.time} onChange={value=>{
                            console.log(value.format('YYYY-HH-DD HH:mm:ss'))
                            this.setState({
                                ruleForm:{
                                    ...this.state.ruleForm,
                                    time:value
                                }
                            })
                        }}></DatePicker>
                    </Form.Item>
                </Form> */}
            </Modal>
        </div>;
    }
}

export default Task;