import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase/DatabaseConn'

import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Link } from "react-router-dom";

export const Users = () => {
    const [tableBody, setTableBody] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const setData = async () => {
        let dataUsers = [];
        const Docs = await getDocs(collection(db, "Users"));
        console.log(Docs);
        let data;
        let cont = 0;
        Docs.forEach((doc) => {
            cont++;
            data = doc.data();
            delete data.Password
            console.log(users)
            dataUsers.push(data);
        });
        setUsers(dataUsers);
        setTableBody(dataUsers);
        setLoading(false);


    }
    setData();

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        FullName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        IdType: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        IdNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Email: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });


    const [globalFilterValue, setGlobalFilterValue] = useState('');


    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };


    const renderHeader = () => {
        return (
            <div className="d-flex align-items-between justify-content-between gap-2">
                <Col className="d-flex justify-content-evenly align-items-start">
                    <Row>
                        <Button type="button" icon="bi bi-filetype-txt" rounded onClick={exportTXT} data-pr-tooltip="CSV" /></Row>
                    <Row><Button type="button" icon="bi bi-file-earmark-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" /></Row>
                    <Row><Button type="button" icon="bi bi-file-earmark-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" /></Row>
                </Col>
                <Col className="d-flex justify-content-end align-items-end">
                    <span className="p-input-icon-left">
                        <i className="bi bi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar Usuario" />
                    </span>
                </Col>
            </div>
        );
    };

    const cols = [
        { field: "FullName", header: 'Nombre Completo' },
        { field: "IdType", header: 'Tipo de Documento' },
        { field: "IdNumber", header: 'Numero de Documento' },
        { field: "Email", header: 'Correo Electrónico' }
    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const exportTXT = () => {
        var json = JSON.stringify(users),
            blob = new Blob([json], { type: "octet/stream" }),
            url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "Users.txt";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                console.log(users);
                doc.autoTable(exportColumns, users);
                doc.save('Users.pdf');
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(users);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'Users');
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };


    const header = renderHeader();


    return (
        <div className='container my-5 align-items-center'>
            <Col className='d-flex align-items-center justify-content-start'>
                <Link to='/Login'><a class="btn btn-secondary bi bi-house-door-fill"></a></Link>
            </Col>
            <Row className='row mt-4 pl-5 pr-5'>
                <Tooltip target=".export-buttons>button" position="bottom" />
                <DataTable value={users} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                    globalFilterFields={['FullName', 'IdType', 'IdNumber', 'Email']} header={header} emptyMessage="No customers found.">
                    <Column field="FullName" header="Nombre Completo" filter filterPlaceholder="Buscar por Nombre Completo" style={{ minWidth: '12rem' }} />
                    <Column field="IdType" header="Tipo de Documento" filter filterPlaceholder="Buscar por Tipo de Documento" style={{ minWidth: '12rem' }} />
                    <Column field="IdNumber" header="Numero de Documento" filter filterPlaceholder="Buscar Numero de Documento" style={{ minWidth: '12rem' }} />
                    <Column field="Email" header="Correo Electrónico" filter filterPlaceholder="Buscar Correo Electrónico" style={{ minWidth: '12rem' }} />
                </DataTable>
            </Row>
        </div>
    )
}