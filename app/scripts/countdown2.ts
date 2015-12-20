class Date2Str {
    private static formatYy: string[] = ["rok", "roky", "rokov"];
    private static formatMm: string[] = ["mesiac", "mesiace", "mesiacov"];
    private static formatDd: string[] = ["deň", "dni", "dní"];
    private static formatHh: string[] = ["hodina", "hodiny", "hodín"];
    private static formatMi: string[] = ["minuta", "minúty", "minút"];
    private static formatSs: string[] = ["sekunda", "sekundy", "sekúnd"];
    
    private static getStr(val :number, formatString :string[]) : string {
      var ret : string;

      if (val === 0) {
        ret = "";
      } else if (val === 1) {
        ret = val + " " + formatString[0];
      } else if (val < 5) {
        ret = val + " " + formatString[1];
      } else {
        ret = val + " " + formatString[2];
      }
      
      return ret;
    }
    
    public static getYy(value: number) : string {
        return this.getStr(value, this.formatYy);
    }
    
    public static getMm(value: number) : string {
        return this.getStr(value, this.formatMm);
    }    
    
    public static getDd(value: number) : string {
        return this.getStr(value, this.formatDd);
    }    
    
    public static getHh(value: number) : string {
        return this.getStr(value, this.formatHh);
    }    
    
    public static getMi(value: number) : string {
        return this.getStr(value, this.formatMi);
    }    
    
    public static getSs(value: number) : string {
        return this.getStr(value, this.formatSs);
    }
}

class DateDiff {
    private yy : number = 0;
    private mm : number = 0;
    private dd : number = 0;
    private hh : number = 0;
    private mi : number = 0;
    private ss : number = 0;
        
    constructor(startDate : Date, endDate : Date) {
      this.yy = endDate.getFullYear() - startDate.getFullYear();
      this.mm = endDate.getMonth()    - startDate.getMonth();
      this.dd = endDate.getDate()     - startDate.getDate();
      this.hh = endDate.getHours()    - startDate.getHours();
      this.mi = endDate.getMinutes()  - startDate.getMinutes();
      this.ss = endDate.getSeconds()  - startDate.getSeconds();
    
      if (this.ss < 0) {
        this.ss += 60;
        --this.mi;
      }
      if (this.mi < 0) {
        this.mi += 60;
        --this.hh;
      }
      if (this.hh < 0) {
        this.hh += 24;
        --this.dd;
      }
      if (this.dd < 0) {
        this.dd += this.getMonthDays(startDate.getFullYear(), startDate.getMonth() + 1);
        --this.mm;
      }
      if (this.mm < 0) {
        this.mm += 12;
        --this.yy;
      }
    }

    private monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    private getMonthDays = function(year: number, month: number) :number {
      return (month == 2 && year % 4 == 0) ? this.monthDays[month-1] + 1 : this.monthDays[month-1];
    }
    
    public toString() : string {
        var strs : string[] = [        
          Date2Str.getYy(this.yy),
          Date2Str.getMm(this.mm),
          Date2Str.getDd(this.dd),
          Date2Str.getHh(this.hh),
          Date2Str.getMi(this.mi),
          Date2Str.getSs(this.ss)
        ];
        
        var res : string;
        var len : number = strs.length;
        for (var i : number = 0; i < len; i++) {
          if (!strs[i]) {
              continue;
          }

          if (!res) {
            res = strs[i];
          } else if (res && (i + 1) == strs.length) {
            res += " a " + strs[i];
          } else {
            res += ", " + strs[i];
          }
        }
        
        return res;
    }
}

class Countdown {
	private toDate: Date;
	
	constructor(toDate: Date) {
		this.toDate = toDate;		
	}
	
    public getWeddingCountdown() : string {
        var currentDate = new Date();
        
        var diff = new DateDiff(currentDate, this.toDate);
        return diff.toString();        
    }
}

function printWeddingCountdown() {
    var wc : Countdown = new Countdown(new Date(2016,4,16,15,0,0));
    console.log(wc.getWeddingCountdown());
}

printWeddingCountdown();