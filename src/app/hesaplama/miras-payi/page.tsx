"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useInheritanceCalculator } from "@/hooks/useLegalCalculators";
import { ArrowLeft, Users, AlertTriangle } from "lucide-react";

export default function InheritanceCalculatorPage() {
    const { input, updateInput, autoResult, errors, disclaimer } = useInheritanceCalculator({
        hasSpouse: false,
        numberOfChildren: 0,
        hasLivingParents: false,
        hasLivingGrandparents: false,
        hasSiblings: false,
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
                    Miras Payı Hesaplama
                </h1>
                <p className="text-lg text-slate-600 mb-8">
                    Yasal mirasçılar arasında miras paylaşımını hesaplayın.
                </p>

                <div className="grid lg:grid-cols-2 gap-8">
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            Miras Bilgileri
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Toplam Miras Değeri (TL)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={input.totalEstate || ""}
                                    onChange={(e) => updateInput({ totalEstate: parseFloat(e.target.value) || 0 })}
                                    placeholder="Örn: 1000000"
                                    className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-3 pt-4 border-t">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={input.hasSpouse || false}
                                        onChange={(e) => updateInput({ hasSpouse: e.target.checked })}
                                        className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-slate-700">Sağ kalan eş var mı?</span>
                                </label>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Çocuk Sayısı
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={input.numberOfChildren ?? 0}
                                        onChange={(e) => updateInput({ numberOfChildren: parseInt(e.target.value) || 0 })}
                                        className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={input.hasLivingParents || false}
                                        onChange={(e) => updateInput({ hasLivingParents: e.target.checked })}
                                        className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-slate-700">Anne veya baba sağ mı?</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={input.hasLivingGrandparents || false}
                                        onChange={(e) => updateInput({ hasLivingGrandparents: e.target.checked })}
                                        className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-slate-700">Büyükanne/büyükbaba sağ mı?</span>
                                </label>
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
                                <div className="bg-blue-50 rounded-xl p-4 text-center">
                                    <div className="text-sm text-blue-600 font-semibold mb-1">Toplam Miras</div>
                                    <div className="text-3xl font-bold text-blue-700">
                                        {autoResult.totalEstate.toLocaleString("tr-TR")} TL
                                    </div>
                                </div>

                                <div className="bg-slate-100 rounded-lg p-4 text-sm text-slate-700">
                                    {autoResult.summary}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-semibold text-slate-900">Mirasçı Payları</h3>
                                    {autoResult.heirs.map((heir, i) => (
                                        <div key={i} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                                            <div>
                                                <span className="text-slate-900 font-medium">{heir.label}</span>
                                                <span className="text-slate-500 text-sm ml-2">({heir.shareLabel})</span>
                                            </div>
                                            <span className="font-semibold text-slate-900">
                                                {heir.amount.toLocaleString("tr-TR")} TL
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                    <div className="text-center">
                                        <div className="text-sm text-slate-600">Saklı Pay Toplamı</div>
                                        <div className="font-bold text-slate-900">
                                            {autoResult.totalReservedPortion.toLocaleString("tr-TR")} TL
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm text-slate-600">Tasarruf Edilebilir</div>
                                        <div className="font-bold text-slate-900">
                                            {autoResult.disposablePortion.toLocaleString("tr-TR")} TL
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-400">
                                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
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
