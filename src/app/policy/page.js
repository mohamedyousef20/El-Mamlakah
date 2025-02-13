
import { Container, Typography, Paper, Divider, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    direction: 'rtl', // تفعيل اتجاه الكتابة من اليمين إلى اليسار
    typography: {
        fontFamily: 'Tajawal, Arial, sans-serif',
    },
    palette: {
        primary: {
            main: '#006C35',
        },
        background: {
            default: '#F4F4F4',
        },
    },
});

export default function PrivacyPolicyPage() {
    return (
      
                <Paper
                    sx={{
                        p: 4,
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        backgroundColor: '#FFFFFF'
                    }}
                >
                    {/* عنوان الصفحة */}
                    <Typography variant="h3" align="center" gutterBottom color="primary">
                        سياسة الخصوصية
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    {/* قسم "من نحن" */}
                    <Box sx={{ my: 2 }}>
                        <Typography variant="h5" gutterBottom color="primary">
                            من نحن
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            في موقع (مؤسسة النخبة للخدمات الحرفية و نقل العفش)، ندرك أن خصوصية معلوماتك الشخصية هامة لك ولنا.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            فيما يلي معلومات حول أنواع المعلومات الشخصية التي نتلقاها ونقوم بجمعها عند زيارات (مؤسسة النخبة للخدمات الحرفية و نقل العفش)، وكيف نقوم بحماية معلوماتك الشخصية.
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />

                    {/* قسم "ملفات السجل" */}
                    <Box sx={{ my: 2 }}>
                        <Typography variant="h5" gutterBottom color="primary">
                            ملفات السجل
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            كما هو الحال مع معظم مواقع الويب المختلفة، نقوم بجمع واستخدام البيانات الموجودة في ملفات السجل.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            تشمل المعلومات الموجودة في ملفات السجل عنوان بروتوكول الإنترنت (IP) الخاص بك، ومزود خدمة الإنترنت (ISP)، والمتصفح الذي استخدمته لزيارة موقعنا، والوقت الذي قمت فيه بالزيارة، والصفحات التي قمت بزيارتها عبر موقعنا.
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />

                    {/* قسم "ملفات تعريف الارتباط" */}
                    <Box sx={{ my: 2 }}>
                        <Typography variant="h5" gutterBottom color="primary">
                            ملفات تعريف الارتباط
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            نحن نستخدم ملفات تعريف الارتباط لنمنحك أفضل تجربة أستخدام ممكنة على موقع بسيط، لمزيد من المعلومات حول ملفات تعريف الارتباط، تفضل بزيارة: What are cookies.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            <strong>ملفات تعريف الارتباط الأساسية:</strong> تعد ملفات تعريف الارتباط الأساسية ضرورية لك للتنقل والتنقل في جميع أنحاء الموقع، ولا تخزن أي معلومات يمكن استخدامها لأغراض الدعاية، وبدونها لن يعمل موقعنا بشكل صحيح.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            <strong>ملفات تعريف الارتباط المخصصة:</strong> تخزن ملفات تعريف الارتباط هذه المعلومات مثل تفضيلاتك الشخصية وتستخدمها لتخصيص تجربة فريدة لك. قد يشمل ذلك عرض نافذة منبثقة مرة واحدة فقط في زيارتك، أو حفظ تفضيلات اللغة، أو السماح لك بتسجيل الدخول تلقائيًا إلى بعض ميزاتنا.
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />

                    {/* قسم "ملفات تعريف الارتباط في Analytics" */}
                    <Box sx={{ my: 2 }}>
                        <Typography variant="h5" gutterBottom color="primary">
                            ملفات تعريف الارتباط في Analytics
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            تلتقط ملفات تعريف الارتباط من Analytics بيانات مجهولة المصدر حتى نتمكن من رؤية الاتجاهات وتحسين تجربة موقعنا على الويب.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            هذه تتيح لنا اختبار تصميمات مختلفة وتساعدنا على تحديد الكسر إذا كان جزء من موقعنا لا يعمل.
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />

                    {/* قسم "ملفات تعريف الارتباط للإعلانات" */}
                    <Box sx={{ my: 2 }}>
                        <Typography variant="h5" gutterBottom color="primary">
                            ملفات تعريف الارتباط للإعلانات
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            قد يستخدم بعض المعلنين من الجهات الخارجية ملفات تعريف الارتباط أو إشارات الويب عند الإعلان على موقعنا.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            سيقوم هؤلاء بإرسال معلومات إلى هؤلاء المعلنين (مثل Google من خلال برنامج Google AdSense) بما في ذلك عنوان IP الخاص بك، ومزود خدمة الإنترنت، والمتصفح الذي استخدمته لزيارة موقعنا، وفي بعض الحالات معلومات حول ما إذا كنت قد قمت بتثبيت Flash.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            يستخدم موردو الجهات الخارجية، بمن فيهم Google، ملفات تعريف ارتباط لعرض الإعلانات بناءً على زيارات المستخدم السابقة لموقعنا الإلكتروني أو لمواقع أخرى على الويب. ستتمكن Google وشركاؤها، باستخدام ملفات تعريف الارتباط للإعلانات، من عرض الإعلانات للمستخدمين لديك استنادًا إلى زياراتهم لموقعنا و/أو مواقع أخرى عبر الإنترنت.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            يمكن للمستخدمين تعطيل استخدام الإعلانات المخصصة عن طريق الانتقال إلى إعدادات الإعلانات. إذا لم يتم اختيار تعطيل عرض إعلانات الأطراف الثالثة، فقد يتم استخدام ملفات تعريف ارتباط موردي أو شبكات إعلانات الأطراف الثالثة الأخرى أيضًا لعرض الإعلانات في موقعنا. يُستخدم هذا عادةً لأغراض الاستهداف الجغرافي أو عرض إعلانات معينة بناءً على المواقع التي تمت زيارتها.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            من خلال الاستمرار في استخدام موقعنا، فإنك توافق على وضع ملفات تعريف الارتباط على جهازك. يمكنك اختيار تعطيل أو إيقاف تشغيل ملفات تعريف الارتباط أو ملفات تعريف ارتباط الطرف الثالث بشكل انتقائي في إعدادات المتصفح الخاص بك. ومع ذلك، قد يؤثر ذلك على كيفية تفاعلك مع موقعنا وكذلك مع مواقع الويب الأخرى.
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />

                    {/* قسم "الاتصال" */}
                    <Box sx={{ my: 2 }}>
                        <Typography variant="h5" gutterBottom color="primary">
                            الاتصال
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            إذا كان لديك أي سؤال أو كانت هناك مشكلة في سياسة استخدام البيانات الخاصة بنا، الرجاء المراسلة عبر صفحة "الاتصال بنا".
                        </Typography>
                    </Box>
                </Paper>
   
    );
}