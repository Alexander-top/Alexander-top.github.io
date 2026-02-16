import React, {  } from 'react';
import { ConfigProvider, Table } from 'antd';

const { Column } = Table;

interface DataType {
  num:String;
  name:String;
  Sname:string;
  Fname:String;
  Electricity: number;
  ves: number;
}

const data: DataType[] = [
  {
    num:"23А",
    name:"Арин",
    Sname:"Баянов",
    Fname:"Артемович",
    Electricity: 2,
    ves: 61,
  },
  {
    num:"23А",
    name:"Кумыс",
    Sname:"Цыкин",
    Fname:"Джамалович",
    Electricity: 4,
    ves: 43.5,
  },
  {
    num:"-1",
    name:"Владимир",
    Sname:"Чёрт",
    Fname:"Джузепович",
    Electricity: 8,
    ves: 94.1,
  },
  {
    num:"45F",
    name:"Армэн",
    Sname:"Багясарян",
    Fname:"Ренатович",
    Electricity: 2,
    ves: 63.7,
  },
  {
    num:"23А",
    name:"Всеволод",
    Sname:"Гончар	",
    Fname:"Вазгенович",
    Electricity: 3,
    ves: 102.4,
  },
  {
    num:"PM23",
    name:"Давид",
    Sname:"Арутюнян",
    Fname:"1",
    Electricity: 1,
    ves: 80,
  }
]
const TableOf: React.FC = () => (
  <>
    <ConfigProvider
      theme={{
        components: {
          Table: {
            fontFamily: 'Ubuntu',
            colorText: 'white',
            colorTextHeading: 'white',
            colorBgContainer: "#a157",
          }
        },
      }}
    >
    <Table<DataType> dataSource={data} pagination={false}  rowClassName={(record,index) => {
        if (index === undefined && record) return '';
        return index % 2 === 0 ? 'even-row' : '';}}
        onRow={() => ({
        style: { cursor: 'default' },
      })}>
        <Column title="Номер команды" dataIndex="num" key="paycheck"/>
        <Column title="Имя" dataIndex="name" key="deadline"/>
        <Column title="Фамилия" dataIndex="Sname" key="hurry"/>
        <Column title="Отчество" dataIndex="Fname" key="status"/>
        <Column title="Разряд" dataIndex="Electricity" key="status"/>
        <Column title="Вес" dataIndex="ves" key="status"/>
    </Table>
    </ConfigProvider>
  </>
);

export default TableOf;