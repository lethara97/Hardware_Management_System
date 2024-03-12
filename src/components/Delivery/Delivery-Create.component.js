import React, { Component } from "react";
import axios from "axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import swal from "@sweetalert/with-react";


export default class CreateDelivery extends Component {
    constructor(props) {
        super(props);

        this.onChangeDPID = this.onChangeDPID.bind(this);
        this.onChangeDPname = this.onChangeDPname.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeContactno = this.onChangeContactno.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            DPID: "",
            DPname: "",
            Amount: "",
            Date: "",
            Contactno: "",
            Delivery: [],
        };
    }

    //set the DPID

    onChangeDPID(e) {
        this.setState({
            DPID: e.target.value,
        });
    }

    //set the DPname

    onChangeDPname(e) {
        this.setState({
            DPname: e.target.value,
        });
    }

    //set Amount
    onChangeAmount(e) {
        this.setState({
            Amount: e.target.value,
        });
    }

    //set Date



    onChangeDate(e) {
            this.setState({
                Date: e.target.value,
            });
        }
        //set Contactno
    onChangeContactno(e) {
        this.setState({
            Contactno: e.target.value,
        });
    }



    //submit Function

    onSubmit(e) {
        e.preventDefault();
        const { Contactno, Amount } = this.state;

        const cup = /^[0-9\b]+$/;
        if (!cup.test(String(Contactno)) || (Contactno.length != 10)) {
            swal(
                "Invalid Contact no !",
                "Contact no Should be number & length shuld be 10!",
                "error"
            );

        } else if (!cup.test(String(Amount))) {
            swal(
                "Invalid  Amount!",
                " Amount Should be number!",
                "error"
            );
        } else {

            const Delivery = {
                DPID: this.state.DPID,
                DPname: this.state.DPname,
                Amount: this.state.Amount,
                Date: this.state.Date,
                Contactno: this.state.Contactno,

            };

            console.log(Delivery);

            axios
                .post("http://localhost:5000/Delivery/add", Delivery)
                .then((res) => console.log(res.data));

            swal({
                title: "Done!",
                text: "Payment Successfully!",
                icon: "success",
                button: "Okay!",
            }).then((value) => {
                swal((window.location = "/Delivery/"));
            });
        }
    }

    render() {
        return ( < div >
            <
            div class = "row " >
            <
            div class = "col-6" >
            <
            br / > { /* <img src="/images/cupcake_logo.gif" width="60%" height="40%" /> */ } <
            /div> <div class = "col-6" > <
            div div class = "myformstyle" >
            <
            div className = "card-body" >
            <
            div className = "col-md-8 mt-4 mx-auto" > < /div>  <
            h3 className = "text-center" >
            <
            font face = "Comic sans MS"
            size = "6" > Delivery Payment < /font> < /
            h3 > < br > < /br >

            <
            br > < /br>

            <
            form onSubmit = { this.onSubmit } >


            <
            div className = "form-group" >
            <
            label > Delivery Person 's ID: </label>  <
            input type = "text"
            placeholder = "Delivery Person's ID"
            required className = "form-control"
            onChange = { this.onChangeDPID }
            />  < /
            div > < div className = "form-group" >

            <
            label > Delivery Person 's Name: </label>  <
            input type = "text"
            placeholder = "Delivery Person's Name"
            required className = "form-control"
            onChange = { this.onChangeDPname }
            />  < /
            div > <
            div className = "form-group" >

            <
            label > Amount: < /label> 

            <
            input type = "Number"
            placeholder = "Amount"
            required className = "form-control"
            onChange = { this.onChangeAmount }
            /> < /
            div >

            <
            div className = "form-group" >
            <
            label > Bill Date: < /label> <
            input type = "date"
            placeholder = "Date"
            required className = "form-control"
            onChange = { this.onChangeDate }
            />

            <
            /div >  

            <
            div className = "form-group" >
            <
            label > Contact No: < /label>  <
            input type = "number"
            placeholder = "Contact No"
            required className = "form-control"
            onChange = { this.onChangeContactno }
            /> < /
            div >



            <
            div className = "form-group" >
            <
            input type = "submit"
            value = "Add Payment"
            className = "btn btn-primary" / >
            <
            /div>{" "} </form > < /div> </div > < /div> < /
            div > < br / > < br / > < /div>
        );
    }
}



{/* /*
 * Copyright (C) 2023 Evoke Labs - All Rights Reserved
 */

'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'

import moment from 'moment-timezone'
import { useRouter, useSearchParams } from 'next/navigation'

import ButtonComponent from '@components/button.component'
import ComboBoxComponent from '@components/comboBox.component'
import DatePickerComponent from '@components/datePicker.component'
import FormElementComponent from '@components/formElement.component'
import InputComponent from '@components/input.component'
import CardLayout from '@components/layouts/card.layout'
import PaginationComponent from '@components/pagination.component'
import TableComponent from '@components/table.component'
import { AlertType, useMessageCtx } from '@contexts/message.context'
import {
  buildRoute,
  currencyFormat,
  fineractDateToMoment
} from '@helpers/global'
import { GlaccountsGetResponse } from '@modals/GlaccountsGetResponse'
import { OfficesGetResponse } from '@modals/OfficesGetResponse'
import { useGlaccounts } from '@services/glaccounts'
import { useSearchJournalEntries } from '@services/journalentries'
import { useOffices } from '@services/offices.c'

export type SearchJournalEntries = {
  dateFormat?: string
  fromDate?: string
  glAccountId?: number
  limit?: number
  locale?: string
  manualEntriesOnly?: number
  officeId?: number
  offset?: number
  toDate?: string
  transactionId?: string
}
function SearchJournalEntriesPage() {
  const searchParams = useSearchParams()
  const glAccountId = parseInt(searchParams?.get('glAccountId')!, 10)
  const officeId = searchParams?.get('officeId')!
  const manualEntriesOnly = searchParams?.get('manualEntriesOnly')!
  const fromDate = searchParams?.get('fromDate')!
  const toDate = searchParams?.get('toDate')!
  const transactionId = searchParams?.get('transactionId')!
  const offset = searchParams?.get('offset')!
  const limit = searchParams?.get('limit')!

  const [data, setData] = useState<SearchJournalEntries>({
    limit: 10,
    offset: 0
  })

  const { data: responseData, loading } = useSearchJournalEntries({
    glAccountId,
    officeId: parseInt(officeId, 10),
    manualEntriesOnly: parseInt(manualEntriesOnly, 10),
    fromDate: fromDate ? moment(fromDate).format('DD MMMM YYYY') : undefined,
    toDate: toDate ? moment(toDate).format('DD MMMM YYYY') : undefined,
    transactionId,
    offset: parseInt(offset, 10),
    limit: parseInt(limit, 10)
  })

  const {
    data: offices,
    error: officesError,
    loading: officesLoading
    // mutate: officesMutate
  } = useOffices()

  const {
    data: glaccountsData,
    error: glaccountsError,
    loading: glaccountsLoading
    // mutate: glaccountsMutate
  } = useGlaccounts({ disabled: false, manualEntriesAllowed: true, usage: 1 })

  const keyValuePairs = useMemo<{ key: number; value: string }[]>(
    () => [
      { key: 0, value: 'All' },
      { key: 1, value: 'Manual' },
      { key: 2, value: 'System' }
    ],
    []
  )

  const router = useRouter()

  const selectedOffice = useMemo(
    () => offices?.find?.((o) => o.id === data?.officeId),
    [data?.officeId, offices]
  )

  const selectedFilter = useMemo(
    () => keyValuePairs?.find?.((o) => o.key === data?.manualEntriesOnly),
    [data?.manualEntriesOnly, keyValuePairs]
  )

  const selectedAddDbit = useMemo(
    () => glaccountsData?.find?.((o) => o.id === data?.glAccountId),
    [data, glaccountsData]
  )

  const { pushAlert } = useMessageCtx()

  const formattedData = useMemo(
    () =>
      responseData?.pageItems?.map((c) => [
        // c.displayName?.toString() ?? '',
        c.id?.toString() ?? '',
        c.officeName ?? '',
        fineractDateToMoment(c.transactionDate)
          ?.format('DD MMMM yyyy')
          .toString() ?? '',
        c.transactionId ?? '',
        c.glAccountType?.value ?? '',
        c.createdByUserName ?? '',
        `${c.glAccountName}(${c.glAccountId})` ?? '',
        c.entryType?.value === 'DEBIT' ? currencyFormat(c.amount!) : '',
        c.entryType?.value === 'CREDIT' ? currencyFormat(c.amount!) : ''
      ]) ?? [],
    [responseData]
  )

  const updateQueryParams = useCallback(
    (d?: SearchJournalEntries) => {
      const queryParams = new URLSearchParams(
        Object.fromEntries(
          Object.entries(d ?? data).filter(([_key, value]) => value !== null)
        ) as any
      )
      router.push(
        buildRoute(`accounting/searchtransaction?${queryParams.toString()}`)
      )
    },
    [data, router]
  )

  const getDefaultOption = (def: any, options: any) => {
    return options ? [def, ...options] : []
  }

  const search = useCallback(async () => {
    try {
      if (!data?.glAccountId && !data?.transactionId) {
        return pushAlert({
          message: 'Need to select Account Name or Code',
          type: AlertType.Error
        })
      }
      updateQueryParams()
    } catch (e: any) {
      if (e?.response?.data?.defaultUserMessage)
        return pushAlert({
          message: e?.response?.data?.defaultUserMessage,
          type: AlertType.Error
        })
      if (e?.message)
        return pushAlert({ message: e?.message, type: AlertType.Error })
    }
  }, [data?.glAccountId, data?.transactionId, pushAlert, updateQueryParams])

  useEffect(() => {
    setData?.((cs) => ({
      ...cs,
      glAccountId,
      transactionId: transactionId!,
      toDate: toDate!,
      fromDate: fromDate!,
      manualEntriesOnly: parseInt(manualEntriesOnly!, 10),
      officeId: parseInt(officeId!, 10)
    }))
  }, [
    glAccountId,
    transactionId,
    toDate,
    fromDate,
    manualEntriesOnly,
    officeId
  ])
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <CardLayout>
        <div className="flex justify-between">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Search Journal Entries
            </h3>
          </div>
        </div>
        <div className="border-t border-gray-200 " />
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-4 gap-x-4 gap-y-4 ">
            <FormElementComponent
              label="Select Account name or Code"
              loading={glaccountsLoading}
              error={glaccountsError}
            >
              <ComboBoxComponent
                value={selectedAddDbit}
                options={glaccountsData}
                optionLabel={(i) => (i.name ? `${i.name} ${i.glCode}` : '')}
                optionKey={(i) => i.id ?? ''}
                placeholder="-Select Account name or Code-"
                onChange={(item) => {
                  setData?.((cs) => ({
                    ...cs,
                    glAccountId: (item as GlaccountsGetResponse).id
                  }))
                }}
                filterItem={(item, query) =>
                  (item?.name
                    ?.toLowerCase?.()
                    ?.includes?.(query.toLowerCase()) ||
                    item?.glCode?.includes?.(query)) ??
                  true
                }
              />
            </FormElementComponent>
            <FormElementComponent
              label="Office"
              loading={officesLoading}
              error={officesError}
            >
              <ComboBoxComponent
                value={selectedOffice}
                options={offices}
                optionLabel={(i) => i.name ?? ''}
                optionKey={(i) => i.id ?? ''}
                placeholder="-- Select Office--"
                onChange={(item) => {
                  setData?.((cs) => ({
                    ...cs,
                    officeId: (item as OfficesGetResponse).id
                  }))
                }}
                filterItem={(item, query) =>
                  (item?.name
                    ?.toLowerCase?.()
                    ?.includes?.(query.toLowerCase()) ||
                    item?.externalId?.toString()?.includes?.(query)) ??
                  true
                }
              />
            </FormElementComponent>
            <FormElementComponent label="Filter">
              <ComboBoxComponent
                value={selectedFilter}
                options={getDefaultOption(
                  { key: undefined, value: '-- Select Filter--' },
                  keyValuePairs
                )}
                optionLabel={(i) => i.value}
                optionKey={(i) => i.key}
                placeholder="-- Select Filter--"
                onChange={(val) => {
                  setData((cs) => ({
                    ...cs,
                    manualEntriesOnly: (val as { key: number; value: string })
                      .key
                  }))
                }}
              />
            </FormElementComponent>

            <div />

            <FormElementComponent label="From Date">
              <DatePickerComponent
                placeholderText="--From--"
                value={
                  data?.fromDate ? new Date(data?.fromDate) : (undefined as any)
                }
                dateFormat="dd MMMM yyyy"
                onChange={(val) => {
                  setData((cs) => ({
                    ...cs,
                    fromDate: moment(val).format('DD MMMM YYYY')
                  }))
                }}
              />
            </FormElementComponent>
            <FormElementComponent label="To Date">
              <DatePickerComponent
                placeholderText="--To--"
                value={
                  data?.toDate ? new Date(data?.toDate) : (undefined as any)
                }
                dateFormat="dd MMMM yyyy"
                onChange={(val) => {
                  setData((cs) => ({
                    ...cs,
                    toDate: moment(val).format('DD MMMM YYYY')
                  }))
                }}
              />
            </FormElementComponent>

            <div />
            <div />
            <FormElementComponent label="Transaction ID">
              <InputComponent
                value={data?.transactionId ?? ''}
                placeholder="--Transaction ID--"
                onChange={(e) => {
                  setData((cs) => ({
                    ...cs,
                    transactionId: e.target.value
                  }))
                }}
              />
            </FormElementComponent>
            <div className="flex px-2 gap-2 justify-start ">
              <div className="grid place-items-end ">
                <ButtonComponent
                  onClick={search}
                  spinner={searchParams?.size === 0 ? false : loading}
                >
                  Search
                </ButtonComponent>
              </div>
              <div className="grid place-items-end ">
                <ButtonComponent
                  className="bg-red"
                  onClick={() => {
                    setData({ limit: 10, offset: 0 })
                    router.push(buildRoute(`accounting/searchtransaction`))
                  }}
                >
                  Clear
                </ButtonComponent>
              </div>
            </div>
          </dl>
          {(responseData?.pageItems?.length ?? 0) > 0 ? (
            <div className="pt-5">
              <TableComponent
                loading={loading}
                onClickRow={(r) =>
                  router.push(
                    buildRoute(`viewtransactions/${r[3]}`, {
                      ...(fromDate ? { fromDate: data?.fromDate! } : {}),
                      ...(glAccountId
                        ? { glAccountId: data?.glAccountId! }
                        : {}),
                      ...(officeId ? { officeId: data?.officeId! } : {}),
                      ...(transactionId
                        ? { transactionId: data?.transactionId! }
                        : {}),
                      ...(toDate ? { toDate: data?.toDate! } : {}),
                      ...(manualEntriesOnly
                        ? { manualEntriesOnly: data?.manualEntriesOnly! }
                        : {})
                    })
                  )
                }
                headings={[
                  'Entry ID',
                  'Office',
                  'Transaction Date',
                  'Transaction ID',
                  'Type',
                  'Created By',
                  'Account',
                  'Debit',
                  'Credit'
                ]}
                cells={formattedData}
              />
              <PaginationComponent
                count={responseData?.totalFilteredRecords! ?? 0}
                limit={10}
                offset={data?.offset!}
                onChange={(_, o) => {
                  setData((cs) => ({
                    ...cs,
                    offset: o
                  }))
                  updateQueryParams({
                    ...data,
                    offset: o
                  })
                }}
              />
            </div>
          ) : null}
        </div>
      </CardLayout>
    </div>
  )
}

export default SearchJournalEntriesPage
 */}