"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useInterestCalculator } from "@/hooks/useLegalCalculators";
import { ArrowLeft, Percent, TrendingUp } from "lucide-react";

export default function InterestCalculatorPage() {
    const { input, updateInput, autoResult, errors, disclaimer } = useInterestCalculator({
        interestType: "legal",
    });
    const [showResult, setShowResult] = useState(false);

    const handleCalculate = () => {
        if (autoResult) {
            setShowResult(true);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-16 pt-28">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link href="/hesaplama" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Tüm Hesaplama Araçları
                </Link>

                <h1 className="text-4xl font-bold text-slate-900 font-playfair mb-4">
                    Yasal Faiz Hesaplama
                </h1>
                <p className="text-lg text-slate-600 mb-8">
                    Yasal ve ticari faiz oranlarına göre gecikme faizi hesaplayın.
                </p>

                <div className="grid lg:grid-cols-2 gap-8">
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Percent className="h-5 w-5 text-blue-600" />
                            Faiz Bilgileri
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Ana Para (TL)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={input.principal || ""}
                                    onChange={(e) => updateInput({ principal: parseFloat(e.target.value) || 0 })}
                                    placeholder="Örn: 100000"
                                    className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Başlangıç Tarihi
                                </label>
                                <input
                                    type="date"
                                    value={input.startDate || ""}
                                    onChange={(e) => updateInput({ startDate: e.target.value })}
                                    className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Bitiş Tarihi (Boş bırakılırsa bugün)
                                </label>
                                <input
                                    type="date"
                                    value={input.endDate || ""}
                                    onChange={(e) => updateInput({ endDate: e.target.value || undefined })}
                                    className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Faiz Türü
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => updateInput({ interestType: "legal" })}
                                        className={`p-3 rounded-lg border text-center font-medium transition-colors ${input.interestType === "legal"
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-slate-700 border-slate-300 hover:border-blue-500"
                                            }`}
                                    >
                                        Yasal Faiz
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => updateInput({ interestType: "commercial" })}
                                        className={`p-3 rounded-lg border text-center font-medium transition-colors ${input.interestType === "commercial"
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-slate-700 border-slate-300 hover:border-blue-500"
                                            }`}
                                    >
                                        Ticari Faiz
                                    </button>
                                </div>
                            </div>

                            {errors.length > 0 && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                                    {errors.map((err, i) => <div key={i}>{err}</div>)}
                                </div>
                            )}

                            <Button onClick={handleCalculate} className="w-full" disabled={!autoResult}>
                                Hesapla
                            </Button>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Sonuç</h2>

                        {showResult && autoResult ? (
                            <div className="space-y-4">
                                <div className="bg-blue-50 rounded-xl p-6 text-center">
                                    <div className="text-sm text-blue-600 font-semibold mb-1">Toplam Tutar</div>
                                    <div className="text-4xl font-bold text-blue-700">
                                        {autoResult.totalAmount.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-100 rounded-lg p-4 text-center">
                                        <div className="text-sm text-slate-600">Ana Para</div>
                                        <div className="text-lg font-bold text-slate-900">
                                            {autoResult.principal.toLocaleString("tr-TR")} TL
                                        </div>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4 text-center">
                                        <div className="text-sm text-green-600">Faiz</div>
                                        <div className="text-lg font-bold text-green-700">
                                            +{autoResult.totalInterest.toLocaleString("tr-TR")} TL
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-slate-600">Toplam Gün</span>
                                    <span className="font-semibold">{autoResult.totalDays} gün</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-slate-600">Ortalama Oran</span>
                                    <span className="font-semibold">%{autoResult.weightedAverageRate}</span>
                                </div>

                                {autoResult.periods.length > 1 && (
                                    <div className="mt-4">
                                        <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4" />
                                            Dönem Detayı
                                        </h3>
                                        <div className="max-h-48 overflow-y-auto space-y-2">
                                            {autoResult.periods.map((period, i) => (
                                                <div key={i} className="text-sm bg-slate-50 rounded p-2">
                                                    <div className="flex justify-between">
                                                        <span>{period.startDate} → {period.endDate}</span>
                                                        <span className="font-medium">%{period.rate}</span>
                                                    </div>
                                                    <div className="text-slate-500">
                                                        {period.days} gün = {period.interest.toLocaleString("tr-TR")} TL
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-400">
                                <Percent className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>Bilgilerinizi girip "Hesapla" butonuna tıklayın.</p>
                            </div>
                        )}
                    </Card>
                </div>

                <div className="mt-8 bg-slate-100 rounded-xl p-4 text-sm text-slate-600 text-center">
                    {disclaimer}
                </div>
            </div>
        </div>
    );
}
