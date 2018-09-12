import React from 'react';

import { Table, Button, message, Modal } from 'antd'
const confirm = Modal.confirm;
//table 数据
import tableData from './tableData'
import './style/style.less'
import $ from 'jquery'

const { dataSources, columns } = tableData;

class UserTableComponent extends React.Component{
    constructor(arg){
        super(arg);

        this.state = {
            endLuckUser: false,
        }
        this.randomUser = this.randomUser.bind(this);
    }

    //随机生成用户
    randomUser(){
        let that = this;
        let initTime = 600;
        let timeCount = 0;
        let luckyTime = setInterval(getLuckyUser,initTime)

        function getLuckyUser(){
            clearInterval(luckyTime)
            let luckyUserIdx = Math.floor(Math.random() * 14)
            // console.log(luckyUser);
            $('.ant-table-tbody tr').removeClass('luckyUser').eq(luckyUserIdx).addClass('luckyUser');
            timeCount++;
            if(initTime > 150){
                initTime = initTime - 60;
            }
            if(timeCount == 18){
                let luckyUser = $('.ant-table-tbody tr').eq(luckyUserIdx).children('td:nth-child(1)').text();
                console.log(luckyUser)
                clearInterval(luckyTime);
                console.log(that.state.endLuckUser);
                if(that.state.endLuckUser){
                    setTimeout(function(){
                        message.info(`恭喜${luckyUser}获得成为lucky boy！`);
                        confirm({
                            title: '恭喜!恭喜!恭喜!',
                            content: `Lucky Boy!:${ luckyUser }`,
                        
                        })
                    },200);
                    
                }
                else{
                    setTimeout(function(){
                        message.info(`恭喜${luckyUser}获得...哦不,这是第一次防黑幕测试`);
                        confirm({
                            title: '这是测试!这是测试!这是测试!',
                            content: `测试的可怜娃:${ luckyUser }`,
                            okText: '再抽一次!',
                            onOk() {
                                that.randomUser();
                            },
                        })
                    },200)
                    
                    that.setState({
                        endLuckUser: true
                    })
                }
            }else{
                luckyTime = setInterval(getLuckyUser, initTime)
            }   
        }        
    }
    

    render(){          
        // console.log(dataSources);
        // console.log(columns);
        return(
            <div className="tableWried">
                <Button 
                    type = "primary"
                    className="randomBtn"
                    onClick={ this.randomUser }
                >抽取
                </Button>
                <Table 
                    columns={ columns } 
                    dataSource={ dataSources } 
                    pagination = {{ pageSize: 20 }}  
                    size = "small"
                />

            </div>
        )
    }
}

export default UserTableComponent