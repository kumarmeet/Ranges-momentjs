getDateRange(startDate, endDate, type) {
    let fromDate = moment(startDate);
    let toDate = moment(endDate);
    let diff = toDate.diff(fromDate, type);
    let range = [];

    for (let i = 0; i <= diff; i++) {
      range.push(moment(startDate).add(i, type).format("YYYY-MM-DD"));
    }

    return range;
}

async getTimeRange(startDate){
    const {from_date, to_date} = (await this.dateHasFound(startDate)).found[0];

    const fTime = from_date.split(" ")[1].split(":");
    const tTime = to_date.split(" ")[1].split(":");

    const start = moment().startOf('day');
    const times = +tTime[0];

    const timeRange = [];

    for (let i = +fTime[0]; i <= times; i++) {
      timeRange.push(moment(start).add(60 * i, 'minutes').format("HH:mm"));
    }

    return timeRange;
}

//dateHasFound() is a helper function getting date from database
  async dateHasFound(startDate){
    const found = await this.db.select("from_date", "to_date", "date_type")
    .table(this.table)
    .whereRaw("DATE (`from_date`) = ?", [startDate]);

    return {found, dateFound: found.length !== 0};
  }
