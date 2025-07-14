const { createApp, ref, computed } = Vue;

createApp({
    data(){
        return {
            modelChoice: ref("gen"),
            invoiceAmt: ref(null),
            msrpAmt: ref(null),
            baseMsrpAmt: ref(null),
            destinationAmt: ref(null),
            optionsAmt: ref(null),
            paintAmt: ref(null),

            calculated: computed(() => {
                if(this.modelChoice === 'gen') {
                    if(
                        this.invoiceAmt != null &&
                        this.msrpAmt != null &&
                        this.baseMsrpAmt != null &&
                        this.destinationAmt != null
                    ) return true
                } else {
                    if(
                        this.baseMsrpAmt != null &&
                        this.optionsAmt != null &&
                        this.paintAmt != null
                    ) return true
                }
                return false
            }),

            getTotal: computed(() => {
                if(this.msrpAmt > 0 && this.destinationAmt > 0) {
                    return Math.round(this.msrpAmt - this.destinationAmt).toFixed(2)
                }
                return (0).toFixed(2)
            }),
            getHoldback: computed(() => {
                if(this.modelChoice === "id4") {
                    return (this.baseMsrpAmt * 0.048).toFixed(2)
                }
                return Math.round(this.getTotal * 0.02).toFixed(2)
            }),
            getOptionsHB: computed(() => {
                if(this.modelChoice === "id4") {
                    if(this.optionsAmt > 0) {
                        return Math.round(this.optionsAmt * 0.02).toFixed(2)
                    }
                    return (0).toFixed(2)
                }
                return (0).toFixed(2)
            }),
            getPaintHB: computed(() => {
                if(this.modelChoice === "id4") {
                    if(this.paintAmt > 0) {
                        return Math.round(this.paintAmt * 0.078).toFixed(2)
                    }
                    return (0).toFixed(2)
                }
                return (0).toFixed(2)
            }),
            getTotalHB: computed(() => {
                if(this.modelChoice === "id4") {
                    const hb = Number(this.getHoldback)
                    const opt = Number(this.getOptionsHB)
                    const pnt = Number(this.getPaintHB)
                    const ttl = hb + opt + pnt

                    if(hb === 0 || opt === 0) return (0).toFixed(2)
                    return Math.floor(ttl + 1).toFixed(2)
                }
                return (0).toFixed(2)
            }),
            getFPA: computed(() => {
                return Math.round(this.baseMsrpAmt * 0.015).toFixed(2)
            }),
            getIDM: computed(() => {
                if(this.modelChoice === "id4") {
                    return Math.round(this.baseMsrpAmt * 0.02).toFixed(2)
                }
                return Math.round(this.baseMsrpAmt * 0.008).toFixed(2)
            }),
            getTrans: computed(() => {
                // Base MSRP * 1.35%
                // if value is under 50 (any hundred amount) round down, else round up next dollar amount
                if (this.baseMsrpAmt.value != null) {
                    const value = (baseMsrpAmt.value * 0.0135).toFixed(2)
                    let val = Math.floor(Math.round(Number(value)))
                    const dollarVal = val % 100
                    if (dollarVal > 50) {
                        return (val + 1).toFixed(2)
                    } else {
                        return (val).toFixed(2)
                    }
                }
                return 0.00
            }),
            getVPB: computed(() => {
                return Math.round(this.baseMsrpAmt * 0.019).toFixed(2)
            }),
            clearForm: () => {
                this.modelChoice = "gen"
                this.invoiceAmt = null
                this.msrpAmt = null
                this.baseMsrpAmt = null
                this.destinationAmt = null
                this.optionsAmt = null
                this.paintAmt = null
            }
        }
    }
}).mount("#app");
