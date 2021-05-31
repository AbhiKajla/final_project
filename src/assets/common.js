
const oneHour = 60 * 60 * 1000;
const oneDay = 24 * oneHour;
const oneYear = 365 * oneDay;
const oneLeapYear = 366 * oneDay;
const fourYears = 3 * oneYear + oneLeapYear;
function dayOfWeekString(day) {
  switch (day) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saterday';
  }
}

function monthStringEth(month) {
  switch (month) {
    case 1:
      return 'Meskerem ';
    case 2:
      return 'Tikimt ';
    case 3:
      return 'Hidar ';
    case 4:
      return 'Tahsas ';
    case 5:
      return 'Tir ';
    case 6:
      return 'Yekatit ';
    case 7:
      return 'Megabit ';
    case 8:
      return 'Meyazya ';
    case 9:
      return 'Ginbot ';
    case 10:
      return 'Sene ';
    case 11:
      return 'Hamle ';
    case 12:
      return 'Nehase ';
    case 13:
      return 'Pagume ';
  }
}

function leftpad(Num, length) {
  length = length || 2;
  return ('000000000' + Num).slice(-length);
}

function ethTime(date, mon, yr, hr, min, sec) {//mon in human form
  if (date <= 30) {
    this.date = date;
  } else {
    throw new Error('Invalid Ethiopian Date');
  }
  if (yr > 200) {
    this.year = yr;
  } else {
    this.year = yr + 1900;
  }
  this.month = mon;
  this.hour = hr;
  this.minute = min;
  this.second = sec;
  this.getDay = ethDayOfWeek;
  this.dateString = monthStringEth(mon) + this.date + ', ' + this.year;
  if (hr < 13) {
    this.timeString = leftpad(hr) + ':' + leftpad(min) + ':' + leftpad(sec) + ' a.m.';
  } else {
    this.timeString = leftpad(hr - 12) + ':' + leftpad(min) + ':' + leftpad(sec) + ' p.m.';
  }
  this.dateWithDayString = dayOfWeekString(this.getDay()) + ', ' + this.dateString;
  this.dateTimeString = this.dateString + ', ' + this.timeString;
  this.fullDateTimeString = this.dateTimeString + ', ' + dayOfWeekString(this.getDay()) + '.';
  function ethDayOfWeek() {
    return (this.year + 2 * this.month + this.date + ethDifference(this.year)) % 7;
    function ethDifference(ethYear) {
      return -(Math.floor((2023 - ethYear) / 4));
    }
  }
}

function toEthiopianDateTime(eurDate) {
  var difference = eurDate.getTime() - new Date(Date.UTC(1971, 8, 12)).getTime();
  var fourYearsPassed = Math.floor(difference / fourYears);
  var remainingYears = Math.floor((difference - fourYearsPassed * fourYears) / oneYear);
  if (remainingYears === 4) {
    remainingYears = 3;
  }
  var remainingMonths = Math.floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear) / (30 * oneDay));
  var remainingDays = Math.floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear - remainingMonths * 30 * oneDay) / oneDay);
  var remainingHours = eurDate.getHours(); // - 6 to account for traditional local time
  if (remainingHours < 0) {
    remainingHours += 24;
  }
  var ethDate = new ethTime(remainingDays + 1, remainingMonths + 1, remainingYears + 4 * fourYearsPassed + 1964, remainingHours, eurDate.getMinutes(), eurDate.getSeconds());
  return ethDate;
}

if( $('#datetimepicker1').length )         // use this if you are using id to check
{
    $('#datetimepicker1').bind('keypress', function(e) {
     e.stopPropagation(); 
    });
}

if( $('#datetimepicker').length )         // use this if you are using id to check
{
    $('#datetimepicker').bind('keypress', function(e) {
     e.stopPropagation(); 
    });
}



$(document).on('change','#selectCalendar',function(){
var da = toEthiopianDateTime(new Date());//toEthiopianDateTime(new Date()).month+'/'+toEthiopianDateTime(new Date()).date+'/'+toEthiopianDateTime(new Date()).year;
var full_d = '';
if(da.month < 10)
{
  full_d += '0'+da.month;
}else
{
  full_d += da.month;
}
full_d += '/';
if(da.date < 10)
{
  full_d += '0'+da.date;
}else
{
  full_d += da.date;
}
full_d += '/';
  full_d += da.year;
	
  if($(this).val() == 'am')
  {
    var firstOpen = true;
    $('#datetimepicker').datetimepicker({
       allowInputToggle: true, 
     	format: 'MM/DD/YYYY',
	    locale: {
			     	calender: 'ethiopian',
					lang: 'am',
				}
	 }).on("dp.show", function(){ 
    if (firstOpen==true){
      $(this).data('DateTimePicker').date(full_d); 
      $(this).data("DateTimePicker").minDate(full_d);
      firstOpen=false; 
    } 
  });
  }else
  { 
  	$('#datetimepicker1').datetimepicker({ 
  		allowInputToggle: true,
  		format: 'MM/DD/YYYY',
  		 minDate: moment(),
	    locale: {
			     	calender: 'gregorian',
					lang: 'en',
					defaultDate: new Date()
					
				}
	});
      
  }
});

$(document).on('click','#getradio',function(){
 setTimeout(function(){ 

$('#selectCalendar').trigger('change');

	}, 100);
});