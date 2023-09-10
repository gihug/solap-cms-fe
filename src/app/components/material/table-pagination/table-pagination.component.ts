import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {CLICK_DETAIL, EVENT_PUSH} from "../../../utils/constant/constant";
import {AppModuleService} from "../../../services/app-module.service";

@Component({
    selector: 'app-table-pagination',
    templateUrl: './table-pagination.component.html',
    styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
    @ViewChild(MatSort, {static: true}) sort: MatSort | undefined;
    @Input('hasPagination') hasPagination = true;
    @Input('hasCheckBox') hasCheckBox = true;

    @Output('clickPagination') clickPagination = new EventEmitter();
    @Output('clickBtn') clickBtn = new EventEmitter();
    @Output('clickEdit') clickEdit = new EventEmitter();
    @Output('clickCell') clickCell = new EventEmitter();

    listTbData: any;
    _itemPerPage: string | null | number = localStorage.getItem('item-per-page')
    && Number.isInteger(localStorage.getItem('item-per-page'))
        ? localStorage.getItem('item-per-page') : 10;
    pageSizeOptions: number[] = [10, 25, 50, 100, 200];
    itemPerPage: number = this._itemPerPage ?
        Number.parseInt(typeof this._itemPerPage === "string" ? this._itemPerPage : this._itemPerPage.toString())
        : 10;

    displayedColumns: string[] = [];
    displayedColumnsAll: any[] = [];

    page: any;
    collectionSize: any;

    dataSource: MatTableDataSource<any> | undefined;
    selection = new SelectionModel<any>(true, []);

    dataSubscribe: any;

    constructor(
        public mService: AppModuleService
    ) {
    }

    ngOnInit() {
        // Bắt event thay đổi list
        this.dataSubscribe = this.mService.currentEvent.subscribe((sData: any) => {
            // event update data trong bảng
            if (sData.name == EVENT_PUSH.TABLE) {
                //thông tin pagination
                this.page = sData.params.page;
                this.collectionSize = sData.params.collectionSize;
                //thông tin data trong bảng
                this.dataSource = new MatTableDataSource(sData.params.listData);
                this.dataSource.sort = this.sort ? this.sort : null;

                this.selection.clear();

                //thông tin setup bảng
                if (this.hasCheckBox) {
                    this.displayedColumns = ['id'];
                } else {
                    this.displayedColumns = [];
                }

                this.displayedColumnsAll = [];
                this.listTbData = sData.params.listTbData;

                setTimeout(() => {
                    this.listTbData.listColumn.forEach((item: any) => {
                        this.displayedColumns.push(item.cell);
                    });
                    this.displayedColumnsAll = this.listTbData.listColumn;
                });
            }
            //event xóa nút check khi đã thao tác xong
            if (sData.name == EVENT_PUSH.SELECTION) {
                this.selection.clear();
            }
        });
    }

    ngOnDestroy() {
        this.dataSubscribe.unsubscribe();
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource ? this.dataSource.data.length : 0;

        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.dataSource?.data.forEach((row) => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
            row.id + 1
        }`;
    }

    /** Event when click pagination */
    onClickPagination(event: any) {
        if (event) {
            this.mService.getApiService().setItemPerPage(event.pageSize);
            this.clickPagination.emit(event.pageIndex + 1);
        }
    }

    /** Click các button và trả về các loại btn tương ứng, gồm loại btn và data */
    onClickBtn(item: any) {
        console.log(item);

        let ev;
        if (item.id == 0) {
            let addAssets: any[] = [];

            this.selection.selected.forEach((selectionItem) => {
                addAssets.push(selectionItem.stt);
            });

            ev = {
                btnType: item.id,
                data: addAssets,
            };
        } else {
            let listID: any[] = [];
            this.selection.selected.forEach((item) => {
                listID.push(item.id);
            });
            ev = {
                btnType: item.id,
                data: JSON.stringify(listID),
            };
        }

        this.clickBtn.emit(ev);
    }

    onClickEdit(row: any) {
        this.clickEdit.emit({
            data: row,
        });
    }

    /** Click vào ô và bắt event */
    // Gihug viết thêm click cell
    onClickCell(row: any, cell: any) {
        this.clickCell.emit({
            clickDetail: CLICK_DETAIL.CELL,
            data: row,
            cell: cell
        });
    }
}
