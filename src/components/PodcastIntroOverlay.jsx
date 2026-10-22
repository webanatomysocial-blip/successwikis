import React, { useState, useRef, useEffect } from 'react'
import logoWhite from '../assets/podcast-white-logo.png'
import { CgMouse } from "react-icons/cg";

const ThumbSVG = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="396" height="283" viewBox="0 0 396 283" fill="none">
        <path d="M66 -96.2004C67.2938 -72.5057 78.5137 -32.4429 78.9459 8.48279C79.378 49.4085 79.8075 79.1328 78.9459 96.7953C78.0816 114.458 89.1863 132.285 92.6225 164.972C94.0865 178.895 96.4436 171.158 97.232 177.538C100.964 207.79 101.936 245.701 122.959 244.99C148.418 244.13 181.643 220.435 178.624 160.555C175.604 100.675 172.152 99.8126 171.72 87.7509C171.288 75.6891 176.419 33.9006 178.815 16.6695C181.211 -0.561523 198.903 -5.73084 214.439 -34.5948C229.973 -63.4588 241.192 -66.0421 255 -113" fill="white"/>
        <path d="M66 -96.2004C67.2938 -72.5057 78.5137 -32.4429 78.9459 8.48279C79.378 49.4085 79.8075 79.1328 78.9459 96.7953C78.0816 114.458 89.1863 132.285 92.6225 164.972C94.0865 178.895 96.4436 171.158 97.232 177.538C100.964 207.79 101.936 245.701 122.959 244.99C148.418 244.13 181.643 220.435 178.624 160.555C175.604 100.675 172.152 99.8126 171.72 87.7509C171.288 75.6891 176.419 33.9006 178.815 16.6695C181.211 -0.561522 198.903 -5.73084 214.439 -34.5948C229.973 -63.4588 241.192 -66.0421 255 -113" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M89.9747 86.5166C103.219 80.6048 115.804 81.3029 121.715 83.6744" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M79.6819 107.385C89.6106 101.261 98.3032 100.022 104.327 99.666" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M95.7915 174.141C112.056 163.845 138.542 173.809 141.486 184.106C144.43 194.403 144.43 223.803 144.43 223.803" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const HandSVG = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="396" height="283" viewBox="0 0 396 283" fill="none">
        <g clipPath="url(#clip0_802_5398)">
            <path d="M312.362 5.7984C312.362 5.7984 311.443 2.87424 299.364 -21.2792C287.285 -45.4327 253.066 -19.0136 261.368 10.6746C266.652 31.3055 278.227 54.2019 278.227 54.2019C272.083 54.3979 268.414 55.9815 265.921 58.2262C260.051 52.2107 253.724 48.6673 247.026 47.1543C248.992 27.8979 247.622 7.71381 243.169 -13.3326C243.169 -13.3326 248.767 -13.7638 254.793 -36.5819C260.822 -59.4 275.459 -130.008 286.224 -189.854C296.988 -249.701 269.002 -284.142 264.695 -317.293C260.388 -350.444 258.666 -405.984 258.666 -405.984L80.8412 -373.693C80.8412 -373.693 88.1612 -295.335 89.4522 -264.766C90.7432 -234.197 79.5503 -213.532 66.2013 -178.659C52.855 -143.787 15.8239 -18.93 6.78175 13.792C-2.26042 46.514 -2.26042 57.2776 6.78175 73.636C15.8239 89.9944 48.117 143.812 66.2013 180.841C84.2856 217.867 93.3278 235.95 101.508 254.893C109.687 273.836 123.467 286.752 149.732 282.017C175.996 277.282 262.111 262.212 294.832 255.755C327.556 249.298 361.569 238.103 355.543 216.145C352.498 205.049 344.737 195.746 331.346 191.464C331.346 191.464 345.889 182.056 356.24 164.3C366.594 146.543 387.185 114.072 392.613 103.353C398.043 92.6338 395.749 82.2464 384.752 79.4764C373.752 76.7065 361.35 75.8729 355.464 77.4512C349.579 79.0296 344.185 81.1593 344.185 81.1593C344.185 81.1593 351.991 46.859 350.193 26.3718C348.395 5.88199 342.387 -1.36169 329.135 -0.300751C315.89 0.757568 312.362 5.7984 312.362 5.7984Z" fill="white"/>
            <path d="M259.202 -407C259.202 -407 260.924 -351.46 265.231 -318.309C269.538 -285.159 297.524 -250.715 286.76 -190.871C275.995 -131.027 261.355 -60.4164 255.329 -37.5982C249.3 -14.7801 243.705 -14.3489 243.705 -14.3489C248.158 6.69749 249.527 26.8816 247.562 46.138C254.26 47.6484 260.587 51.1944 266.456 57.2099C268.95 54.9652 272.619 53.379 278.763 53.1856C278.763 53.1856 267.188 30.2891 261.904 9.65823C253.601 -20.0299 287.821 -46.449 299.899 -22.2955C311.978 1.85795 312.898 4.78208 312.898 4.78208" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M81.3769 -374.709C81.3769 -374.709 88.6969 -296.351 89.9879 -265.782C91.2789 -235.213 80.0859 -214.549 66.737 -179.676C53.388 -144.803 16.3596 -19.9464 7.31739 12.7756C-1.72477 45.4976 -1.72477 56.2613 7.31739 72.6196C16.3596 88.9807 48.6526 142.796 66.737 179.825C84.8213 216.85 93.8635 234.934 102.043 253.876C110.223 272.819 124.003 285.736 150.267 281.001C166.917 277.999 207.612 270.846 243.514 264.366C249.201 263.339 255.057 264.434 260.388 263.461C265.571 262.516 270.238 259.5 274.871 258.638C282.855 257.156 289.867 255.826 295.368 254.739C328.092 248.282 362.105 237.087 356.078 215.128C350.052 193.17 325.56 178.228 275.485 195.339C244.601 194.265 210.818 199.868 185.573 209.534C185.573 209.534 182.819 197.926 177.822 187.324" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M175.34 111.023C193.934 120.284 211.681 133.091 228.435 150.05C249.198 144.921 270.985 142.028 293.855 141.495C293.855 141.495 302.913 125.897 322.79 98.4716C342.667 71.0465 373.366 73.0586 386.197 78.8467C399.029 84.6349 398.527 93.6921 388.965 110.55C379.402 127.407 354.746 164.391 347.446 175.463C340.15 186.532 330.854 189.428 330.854 189.428" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M344.723 80.1429C344.723 80.1429 347.703 57.7115 349.966 39.8479C352.229 21.9844 350.217 1.85516 337.134 0.0938861C324.052 -1.66738 302.915 3.11212 295.616 28.0208C288.32 52.9294 285.67 85.134 285.67 85.134L247.306 111.553L200.002 85.134C200.002 85.134 190.309 88.3717 184.664 94.1808" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M199.482 85.1366C196.628 65.8358 187.957 31.1487 187.957 31.1487" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M322.782 13.5098C319.627 36.584 321.287 54.6775 330.418 60.9831C339.549 67.2912 346.916 63.4812 346.916 63.4812" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M377.066 90.6975C370.593 102.65 365.612 110.782 361.13 123.73C356.648 136.679 367.778 142.409 372.339 137.468" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M247.306 111.556C240.94 118.089 239.944 135.383 239.944 135.383" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M285.672 85.1372C285.267 94.184 293.068 107.963 293.068 107.963" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M247.56 46.1382C240.446 48.8663 224.011 62.9774 220.689 70.2812" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M267.264 56.5383C264.047 66.3586 265.991 76.934 265.991 76.934" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M278.76 53.1831C278.76 53.1831 284.159 58.9638 287.222 61.3785" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M228.435 150.05C221.353 161.08 222.349 176.519 222.349 176.519" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M293.857 141.495C294.895 150.455 298.88 160.249 302.199 165.23" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M275.488 195.339C272.815 204.074 272.815 215.528 272.815 215.528" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M343.866 223.161C331.416 227.311 305.022 236.938 299.541 243.745C294.061 250.552 297.153 254.381 297.153 254.381" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M185.576 209.531C180.517 218.016 180.517 232.457 180.517 232.457" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M271.025 -10.0449C276.651 6.94063 284.797 21.0935 298.133 21.2869" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M176.536 189.428L182.116 197.487C182.116 197.487 181.706 177.329 185.484 155.734C189.263 134.136 200.603 130.357 200.603 130.357L174.477 111.556L177.731 170.493L176.536 189.428Z" fill="#222222"/>
            <path d="M173.071 101.467C172.345 79.9629 177.924 63.5758 182.064 55.6605C186.203 47.7453 190.162 57.2075 190.162 57.2075L192.718 53.016C192.718 53.016 195.204 48.9264 191.783 31.1491C188.691 15.0755 202.351 -4.55978 216.646 -9.9063C223.098 -11.9707 221.034 -17.5603 219.194 -19.5907C216.306 -22.6455 220.55 -32.714 230.12 -47.9984C242.178 -67.2548 249.739 -87.9536 249.739 -87.9536L220.843 -46.3625L203.697 -18.7754L177.728 13.5102L170.364 80.5038L173.071 101.467Z" fill="#222222"/>
            <path d="M311.508 3.65604L305.215 -7.41333H302.659C302.659 -7.41333 307.222 -1.75583 300.103 4.81365C292.984 11.3831 288.573 14.3021 285.212 10.6541C281.852 7.00353 283.495 14.2733 283.495 14.2733C283.495 14.2733 279.042 15.5825 282.73 19.0502C286.417 22.5178 285.612 37.4808 281.269 60.2937C276.925 83.1039 278.932 84.3818 267.982 92.0462C257.033 99.7106 280.393 90.7004 280.393 90.7004L284.742 85.1397L295.54 24.7077L311.508 3.65604Z" fill="#222222"/>
            <path d="M345.343 79.4506V64.6235L330.104 61.3779C330.104 61.3779 326.555 63.3848 330.136 65.3891C333.716 67.3908 331.495 73.9786 321.82 84.379C312.148 94.782 297.976 113.835 292.924 123.469C287.873 133.104 278.183 137.512 266.786 139.232C255.389 140.951 254.396 144.053 254.396 144.053L295.355 141.497C295.355 141.497 324.193 96.4962 324.376 96.5511C324.559 96.6059 338.794 82.9209 338.794 82.9209L345.343 79.4506Z" fill="#222222"/>
            <path d="M331.808 190.735L345.343 178.542L354.568 163.283C354.568 163.283 354.926 157.814 351.364 162.487C347.802 167.161 339.342 176.715 316.53 180C293.719 183.285 234.952 193.322 234.952 193.322L270.358 195.337L307.771 188.396L331.808 190.735Z" fill="#222222"/>
            <path d="M109.949 185.906C118.792 183.959 127.461 188.205 127.461 188.205" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M155.614 255.857C152.784 261.672 152.627 265.13 152.627 265.13" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M139.72 253.135C135.674 260.966 134.958 269.253 134.958 269.253" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M249.739 249.729C250.282 254.044 253.562 262.548 253.562 262.548" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M261.635 253.135L264.802 260.494" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M337.858 50.3032C343.286 53.238 346.916 52.2947 346.916 52.2947" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M370.875 128.162L374.103 130.802" stroke="#222222" strokeWidth="7.84003" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
    </svg>
)

export default function PodcastIntroOverlay({ isOpen = true, onDismiss, onProgress }) {
    const [visualProgress, setVisualProgress] = useState(0)
    const targetProgressRef = useRef(0)
    const chasedTargetRef = useRef(0)
    const currentProgressRef = useRef(0)
    const rafIdRef = useRef(null)
    const isDismissedRef = useRef(false)
    const wasDismissedRef = useRef(false)
    const autoAnimateRef = useRef(false)

    useEffect(() => {
        if (isOpen) {
            isDismissedRef.current = false
            autoAnimateRef.current = false
            if (wasDismissedRef.current) {
                // Reopening from scroll-up! Start lifted at 1.0 and smoothly lerp back down to 0.0
                currentProgressRef.current = 1.0
                targetProgressRef.current = 0.0
                chasedTargetRef.current = 0.0
                wasDismissedRef.current = false
            } else {
                currentProgressRef.current = 0.0
                targetProgressRef.current = 0.0
                chasedTargetRef.current = 0.0
            }
        } else {
            isDismissedRef.current = true
            wasDismissedRef.current = true
        }
    }, [isOpen])

    // Smooth physics loop
    useEffect(() => {
        const updatePhysics = () => {
            const diffTarget = targetProgressRef.current - chasedTargetRef.current
            // Speed limit: max increment of 0.007 per frame (~140 frames to go 0 -> 1, about 2.3 seconds)
            const maxStep = 0.007
            if (diffTarget > 0) {
                chasedTargetRef.current += Math.min(diffTarget, maxStep)
            } else {
                chasedTargetRef.current += Math.max(diffTarget, -maxStep)
            }

            const diff = chasedTargetRef.current - currentProgressRef.current
            // 0.05 smoothing for silky, slower momentum
            currentProgressRef.current += diff * 0.05

            if (Math.abs(diff) < 0.0008) {
                currentProgressRef.current = chasedTargetRef.current
            }

            const p = currentProgressRef.current
            setVisualProgress(p)
            if (onProgress) {
                onProgress(p)
            }

            // Check if fully pulled up while open
            if (isOpen && p >= 0.985 && !isDismissedRef.current) {
                isDismissedRef.current = true
                wasDismissedRef.current = true
                if (onProgress) onProgress(1)
                onDismiss()
                return
            }

            rafIdRef.current = requestAnimationFrame(updatePhysics)
        }

        rafIdRef.current = requestAnimationFrame(updatePhysics)
        return () => {
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
        }
    }, [isOpen, onDismiss, onProgress])

    // Scroll & Touch event listeners
    useEffect(() => {
        const handleWheel = (e) => {
            if (!isOpen || autoAnimateRef.current) return

            // Smooth progressive increment/decrement per wheel notch (reduced from 0.00135)
            const delta = e.deltaY * 0.0005
            targetProgressRef.current = Math.max(0, Math.min(1, targetProgressRef.current + delta))
        }

        let touchStartY = null
        const handleTouchStart = (e) => {
            if (!isOpen) return
            touchStartY = e.touches[0].clientY
        }

        const handleTouchMove = (e) => {
            if (!isOpen || autoAnimateRef.current || touchStartY === null) return
            const currentY = e.touches[0].clientY
            const deltaY = touchStartY - currentY
            // Smooth progressive increment/decrement per swipe (reduced from 0.0028)
            const delta = deltaY * 0.001
            targetProgressRef.current = Math.max(0, Math.min(1, targetProgressRef.current + delta))
            touchStartY = currentY
        }

        window.addEventListener('wheel', handleWheel, { passive: true })
        window.addEventListener('touchstart', handleTouchStart, { passive: true })
        window.addEventListener('touchmove', handleTouchMove, { passive: true })

        return () => {
            window.removeEventListener('wheel', handleWheel)
            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('touchmove', handleTouchMove)
        }
    }, [isOpen])

    const handleDiscoverClick = () => {
        if (!isOpen || autoAnimateRef.current) return
        autoAnimateRef.current = true

        const startP = targetProgressRef.current
        const startTime = performance.now()
        const duration = 1350 // 1.35s slow, elegant lift

        const animateAuto = (now) => {
            const elapsed = now - startTime
            const t = Math.min(1, elapsed / duration)
            const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
            targetProgressRef.current = startP + (1 - startP) * eased

            if (t < 1) {
                requestAnimationFrame(animateAuto)
            }
        }
        requestAnimationFrame(animateAuto)
    }

    // Calculate transforms based on visualProgress (0 to 1)
    const gripProgress = Math.min(1, visualProgress / 0.15)
    const liftProgress = Math.max(0, (visualProgress - 0.15) / 0.85)

    const handTranslateY = -300 + (350 * gripProgress)
    const handOpacity = gripProgress

    const topSquishVh = 10 * gripProgress // squishes top edge from 0vh down to 8vh
    const screenTranslateY = -115 * liftProgress

    return (
        <div
            className="intro-orange-viewport"
            style={{
                pointerEvents: isOpen ? 'auto' : 'none',
                visibility: !isOpen && visualProgress >= 0.99 ? 'hidden' : 'visible'
            }}
        >
            <div
                className="intro-screen-assembly"
                style={{
                    top: `${topSquishVh}vh`,
                    height: `calc(100vh - ${topSquishVh * 2}vh)`,
                    transform: `translateY(${screenTranslateY}vh)`
                }}
            >
                {/* 1. Hand behind top of orange screen */}
                <div
                    className="intro-top-hand-behind"
                    style={{
                        transform: `translateX(-50%) translateY(${handTranslateY}px)`,
                        opacity: 1
                    }}
                >
                    <HandSVG className="top-hand-svg" />
                </div>

                {/* 2. Full-Screen Orange Card */}
                <div className="intro-orange-card">
                    <div
                        className="intro-orange-content"
                        style={{
                            transform: `translateY(${-topSquishVh}vh)`
                        }}
                    >
                        <img src={logoWhite} alt="CTRL SHIFT!" className="intro-orange-logo" />

                        <div className="intro-apple-badge">
                            <span className="intro-star-badge">
                                <svg 
                                    stroke="currentColor" 
                                    fill="currentColor" 
                                    strokeWidth="0" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            </span>
                            <span>'Top Business Podcast' on Apple Podcasts U.S. & Canada</span>
                        </div>

                        <p className="intro-orange-p">
                            A podcast about people who changed the world by shifting their perspective.
                        </p>
                    </div>

                    <div
                        className="intro-orange-bottom"
                        style={{
                            transform: `translateY(${-topSquishVh}vh)`
                        }}
                    >
                        <div
                            className="scroll-discover"
                            // onClick={(e) => {
                            //     e.stopPropagation()
                            //     handleDiscoverClick()
                            // }}
                            style={{ margin: 0, color: '#ffffff' }}
                        >
                            <div className="scroll-icon" style={{ borderColor: 'rgba(255, 255, 255, 0.45)' }}>
                                <CgMouse />
                            </div>
                            <span>Scroll to discover</span>
                        </div>
                    </div>
                </div>

                {/* 3. Thumb in front of top of orange screen */}
                <div
                    className="intro-top-thumb-front"
                    style={{
                        transform: `translateX(-50%) translateY(${handTranslateY}px)`,
                        opacity: 1
                    }}
                >
                    <ThumbSVG className="top-thumb-svg" />
                </div>
            </div>
        </div>
    )
}
